import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { error } from '~/util/reporter'

import { reduce, defaultState } from './reducer'

const crashReporterMiddleware = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    err.action = action
    error(err)
    throw err
  }
}

export const create = (sideEffects = []) => {
  const middlewares = [crashReporterMiddleware]

  // enhancers composing
  const enhancers = [
    applyMiddleware(...middlewares),
    'undefined' != typeof window &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__({
        actionSanitizer,
        stateSanitizer,
      }),
  ].filter(Boolean)

  const store = createStore(reduce, defaultState, compose(...enhancers))

  sideEffects.forEach(init => init(store))

  return store
}

const stateSanitizer = state =>
  !state.resource
    ? state
    : {
        ...state,
        resource: {
          ...state.resource,
          original: {
            ...state.resource.original,
            habitatDictionary: '<<huge>>',
            vegetalDictionary: '<<huge>>',
          },
        },
      }

const actionSanitizer = action =>
  action.type === 'localStorage:read' ? stateSanitizer(action) : action
