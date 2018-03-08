import { merge, set } from '~/util/reduxHelper'
import type { State } from './type'

type Entity = {
  [string]: {
    id?: Function,
    readOnly?: boolean,
    refreshRate?: number,
  },
}

export const get = (state: State, entityName: string, id: string) => {
  const c = state.cache[entityName][id]

  if (!c) return null

  return c.updated || c.reference
}

export const set = (state: State, entityName: string, id: string, updated) => ({
  ...state,
  mutations: [
    ...state.mutations,
    { date: Date.now(), entityName, id, key: Math.random().toString() },
  ],
  cache: merge(state.cache, [entityName, id], { updated }),
})

export const create = (entities: Entity[], options) => {
  const defaultState = {}

  entities.forEach(entityName => (defaultState[entityName] = {}))

  return (state: State, action): State => {
    state = state || defaultState

    switch (action) {
      case 'persy:hydrate':
        return {}

      case 'persy:forceRefresh':
        return {}
    }

    return state
  }
}

export const fetcher = (entities: Entity[], options) => store => {
  const shouldRefreshSelector = options.shouldRefreshSelector
    ? options.shouldRefreshSelector
    : () => true

  const shouldApplyMutationSelector = options.shouldApplyMutationSelector
    ? options.shouldApplyMutationSelector
    : () => true

  const persySelector = options.persySelector ? options.persySelector : x => x

  const update = async () => {
    const state = store.getState()
    const shouldApplyMutation = shouldApplyMutationSelector(state)
    const shouldRefresh = shouldRefreshSelector(state)
    const { mutations, cache } = persySelector(state)

    const mutation = mutations[0]

    if (shouldApplyMutation && mutation) {
      const { entityName, id, key } = mutation

      store.dispatch({ type: 'persy:mutation:start', key: mutation.key })

      const res = await entities[mutation]

      return update()
    }

    if (shouldRefresh) {
      const toRefresh = []

      return update()
    }
  }
}
