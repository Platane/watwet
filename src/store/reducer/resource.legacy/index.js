import { set, merge } from '~/util/reduxHelper'
import { getId } from '~/service/google-api/spreadSheets/site/parse/habitat'
import type { State } from './type'

export const defaultState = {


  cache:{
    habitats: {},
    sites: {},
    vegetalDictionary: [],
    habitatCanonicalNames: [],
  }

  shouldRead: {
    vegetalDictionary:
  },
}

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'localStorage:read':
      return { ...state, ...(action.resource || {}) }

    case 'mutation:habitat:update':
      return merge(state, ['habitats', action.habitat.id], action.habitat)

    case 'mutation:habitat:create': {
      const site = state.sites[action.siteId] || { habitats: [] }
      const id = getId(site.habitats.length, action.habitat.info.name)

      return {
        ...state,
        habitats: { ...state.habitats, [id]: { ...action.habitat, id } },
        sites: {
          ...state.sites,
          [action.siteId]: {
            ...site,
            habitats: [...site.habitats, id],
          },
        },
      }
    }

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

    case 'onlineStorage:hydrateHabitatCanonicalNames':
      return { ...state, habitatCanonicalNames: action.habitatCanonicalNames }

    default:
      return state
  }
}
