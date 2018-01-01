import { combineReducers } from 'redux'

import { reduce as router, defaultState as routerDefaultState } from './router'

export const reduce = combineReducers({
  router,
})

export const defaultState = {
  router: routerDefaultState,
}
