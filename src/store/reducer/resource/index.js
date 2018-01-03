import { set } from '~/util/reduxHelper'
import type { State } from './type'

export const defaultState = {
  habitats: [],
}

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'mutation:habitat:update':
      return {
        ...state,
        habitats: state.habitats.map(
          x => (action.habitat.id == x.id ? action.habitat : x)
        ),
      }

    case 'onlineStorage:hydrateHabitats':
      return { ...state, habitats: action.habitats }

    case 'onlineStorage:hydrateVegetalDictionary':
      return { ...state, vegetalDictionary: action.vegetalDictionary }

    default:
      return state
  }
}
