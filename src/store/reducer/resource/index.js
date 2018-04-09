import { set, merge } from '~/util/reduxHelper'
import { selectProperties, isObject, isArray } from '~/util/object'
import { removeDuplicatePrimitive } from '~/util/array'
import { genUid } from '~/util/uid'
import { reduce as mutationReduce } from './mutation'
import type { State } from './type'

// replace string, substring and object key
// #yolo
const seekAndReplace = (o, a, b) => {
  if (typeof o === 'string') return o.replace(a, b)

  if (typeof o === 'number' && a == b) return b

  if (isArray(o)) {
    const copy = o.map(x => seekAndReplace(x, a, b))

    return o.every((_, i) => o[i] == copy[i]) ? o : copy
  }

  if (isObject(o)) {
    const copy = {}

    for (let key in o) {
      const key_ = key.replace(a, b)

      copy[key_] = seekAndReplace(o[key], a, b)
    }

    return Object.keys(o).every(key => o[key] === copy[key]) ? o : copy
  }

  return o
}

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

    case 'resource:forceRefetch': {
      const shouldFetch = { ...state.shouldFetch }

      action.shouldFetch.forEach(key => (shouldFetch[key] = genUid()))

      return {
        ...state,
        shouldFetch,
      }
    }

    case 'resource:online:read': {
      state = {
        ...state,
        dateFetched: { ...state.dateFetched },
        original: { ...state.original },
      }

      // update the cache with fresh entities
      Object.keys(action)
        .filter(key => !['type', 'fromMutation', 'idChanged'].includes(key))
        .forEach(key => {
          state.dateFetched[key] = Date.now()
          state.original[key] = action[key]

          state.shouldFetch = { ...state.shouldFetch }
          delete state.shouldFetch[key]
        })

      // remove the mutated version if the entities is the results of a merge
      Object.keys(action.fromMutation)
        .filter(key => action.fromMutation[key] == state.dateMutated[key])
        .forEach(key => {
          state.mutated = { ...state.mutated }
          delete state.mutated[key]

          state.dateMutated = { ...state.dateMutated }
          delete state.dateMutated[key]
        })

      // sometimes we need to change the id
      Object.keys(action.idChanged).forEach(previousId => {
        state = seekAndReplace(state, previousId, action.idChanged[previousId])
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

      const changed = required.filter(
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
