import type { State } from './type'

export const defaultState = {
  habitats: [],
}

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'onlineStorage:hydrateHabitats':
      return { ...state, habitats: action.habitats }

    case 'onlineStorage:hydrateVegetalDictionary':
      return { ...state, vegetalDictionary: action.vegetalDictionary }

    default:
      return state
  }
}
