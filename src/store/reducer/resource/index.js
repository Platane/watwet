import { set, merge } from '~/util/reduxHelper'
import { selectProperties } from '~/util/object'
import { removeDuplicatePrimitive } from '~/util/array'
import { reduce as mutationReduce } from './mutation'
import type { State } from './type'

export const defaultState = {
  mutated: {},
  original: {},
  dateFetched: {},
  dateMutated: {},
  shouldFetch: {},
  required: [
    //
    'vegetalDictionary',
    'habitatDictionary',
    'sites',
  ],
}

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'localStorage:read':
      return {
        ...state,
        ...selectProperties([
          'mutated',
          'original',
          'dateMutated',
          'dateFetched',
        ])(action.resource || {}),
      }

    case 'resource:online:read': {
      state = {
        ...state,
        dateFetched: { ...state.dateFetched },
        original: { ...state.original },
      }

      Object.keys(action)
        .filter(key => !['type', 'fromMutation'].includes(key))
        .forEach(key => {
          state.dateFetched[key] = Date.now()
          state.original[key] = action[key]
        })

      Object.keys(action.fromMutation)
        .filter(key => action.fromMutation[key] == state.dateMutated[key])
        .forEach(key => {
          state.mutated = { ...state.mutated }
          delete state.mutated[key]

          state.dateMutated = { ...state.dateMutated }
          delete state.dateMutated[key]
        })

      return state
    }

    default: {
      const oldState = state.mutated
      const newState = mutationReduce(oldState, action, state.original)

      if (oldState !== newState) {
        state = {
          ...state,
          dateMutated: { ...state.dateMutated },
          mutated: newState,
        }

        for (let key in newState)
          if (newState[key] != oldState[key])
            state.dateMutated[key] = Date.now()
      }
    }
  }

  return state
}

export const reduceGlobal = (state, action) => {
  const siteKeys = state.resource.original.sites || []

  if (siteKeys.some(key => !state.resource.required.includes(key)))
    state = set(
      state,
      ['resource', 'required'],
      removeDuplicatePrimitive([...state.resource.required, ...siteKeys])
    )

  return state
}
