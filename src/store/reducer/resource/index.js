import type { State } from './type'

export const defaultState = {
  sites: [],
}

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'onlineStorage:hydrateSites':
      return { ...state, sites: action.sites }

    case 'onlineStorage:hydrateVegetalDictionary':
      return { ...state, vegetalDictionary: action.vegetalDictionary }

    default:
      return state
  }
}
