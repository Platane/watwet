import { set, merge } from '~/util/reduxHelper'
import { selectProperties, isObject, isArray } from '~/util/object'
import { removeDuplicatePrimitive } from '~/util/array'
import { genUid } from '~/util/uid'
import { reduce as mutationReduce } from './mutation'
import { seekAndReplace } from './util/seekAndReplace'

import type { State } from './type'

export const defaultState = {
  mutated: {},
  original: {},
  dateFetched: {},
  dateMutated: {},
  mutationKey: {},
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
    /**
     * read from localStorage
     * assume the data are well formated
     */
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

    /**
     * force refresh an entity,
     * force the 'shouldFetch' list with a new id,
     * which tells the sideEffect that it need to be fetched again
     */
    case 'resource:forceRefetch': {
      const shouldFetch = { ...state.shouldFetch }

      action.shouldFetch.forEach(key => (shouldFetch[key] = genUid()))

      return {
        ...state,
        shouldFetch,
      }
    }

    /**
     * read from online storage
     * update the "original" cache, and the date
     *
     * if the read result from a mutation, the "mutated" cache can be removed,
     * since it is now reflected in the "original" cache
     *
     * some resources might have changed id
     * ( because the id is dictated by the online store on creation )
     * in that case, replace the id
     * this is made possible because a dictionary of previousId -> newId is provided ( "idChanged" )
     *
     */
    case 'resource:online:read': {
      state = {
        ...state,
        original: { ...state.original },
        mutated: { ...state.mutated },
        dateMutated: { ...state.dateMutated },
        mutationKey: { ...state.mutationKey },
        dateFetched: { ...state.dateFetched },
      }

      // update the cache with fresh entities
      Object.keys(action)
        .filter(
          key => !['type', 'fromMutation', 'idChanged', 'date'].includes(key)
        )
        .forEach(key => {
          state.dateFetched[key] = action.date
          state.original[key] = action[key]

          state.shouldFetch = { ...state.shouldFetch }
          delete state.shouldFetch[key]
        })

      // remove the mutated version if the entities is the results of a merge
      Object.keys(action.fromMutation)
        .filter(key => action.fromMutation[key] === state.mutationKey[key])
        .forEach(key => {
          delete state.mutated[key]
          delete state.dateMutated[key]
          delete state.mutationKey[key]
        })

      // sometimes we need to change the id
      Object.keys(action.idChanged).forEach(previousId => {
        state = seekAndReplace(state, previousId, action.idChanged[previousId])
      })

      return state
    }

    /**
     * apply mutation, if the action is relevant
     * add mutation information if so ( dateMutated and mutationKey )
     */
    default: {
      const oldState = state.mutated
      const newState = mutationReduce(oldState, action, state.original)

      if (oldState !== newState) {
        const mKey = genUid()

        state = {
          ...state,
          dateMutated: { ...state.dateMutated },
          mutationKey: { ...state.mutationKey },
          mutated: newState,
        }

        Object.keys(newState)
          .filter(key => newState[key] != oldState[key])
          .forEach(key => {
            state.dateMutated[key] = action.date
            state.mutationKey[key] = mKey
          })
      }
    }
  }

  return state
}

export const reduceGlobal = (state, action) => {
  // require the sites
  {
    const siteKeys = state.resource.original.sites || []

    if (siteKeys.some(key => !state.resource.required.includes(key)))
      state = set(
        state,
        ['resource', 'required'],
        removeDuplicatePrimitive([...state.resource.required, ...siteKeys])
      )
  }

  // update shouldFetch
  {
    if (state.init.localStorage) {
      const { shouldFetch, original, dateFetched, required } = state.resource

      const getExpirationDate = key =>
        ['vegetalDictionary', 'habitatDictionary'].includes(key)
          ? Infinity
          : 15 * 60 * 1000

      const changed = required
        .filter(key => !shouldFetch[key])
        .filter(
          key =>
            !original[key] ||
            Date.now() - dateFetched[key] > getExpirationDate(key)
        )

      if (changed.length) {
        const o = { ...shouldFetch }
        changed.forEach(key => (o[key] = genUid()))
        state = set(state, ['resource', 'shouldFetch'], o)
      }
    }
  }

  return state
}
