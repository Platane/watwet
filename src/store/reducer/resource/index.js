import { set, merge } from '~/util/reduxHelper'
import { selectProperties } from '~/util/object'
import { getId } from '~/service/google-api/spreadSheets/site/parse/habitat'
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
        .filter(key => key !== 'type')
        .forEach(key => {
          state.dateFetched[key] = Date.now()
          state.original[key] = action[key]
        })

      return state
    }

    default: {
      const oldState = state.mutated
      const newState = mutationReduce(oldState, action)

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
