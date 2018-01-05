import { set, merge } from '~/util/reduxHelper'
import type { State } from './type'

export const defaultState = {
  habitats: {},
  sites: {},
  vegetalDictionary: [],

  shouldRead: true,
}

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'localStorage:read':
      return { ...state, ...(action.resource || {}) }

    case 'mutation:habitat:update':
      return merge(state, ['habitats', action.id], action)

    case 'mutation:site:update':
      return merge(state, ['sites', action.id], action)

    case 'onlineStorage:hydrateSites': {
      const habitats = { ...state.habitats }
      const sites = { ...state.sites }

      action.sites.forEach(site => {
        sites[site.id] = {
          ...site,
          habitats: site.habitats.map(x => x.id),
        }

        site.habitats.forEach(h => (habitats[h.id] = h))
      })

      return { ...state, sites, habitats, shouldRead: false }
    }

    case 'onlineStorage:hydrateVegetalDictionary':
      return { ...state, vegetalDictionary: action.vegetalDictionary }

    default:
      return state
  }
}
