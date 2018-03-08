import { routeValidator } from '~/service/router/routeValidator'
import { routes } from './routes'
import { getId } from '~/service/google-api/spreadSheets/site/parse/habitat'
import { keyToLabel } from '~/store/selector/currentLayer'

import type { State } from './type'

const getRoute = routeValidator(routes)

export const defaultState = {
  hash: {},
  query: {},
  ...getRoute('/'),
}

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'location:changed':
      return {
        query: action.query,
        hash: action.hash,
        ...getRoute(action.pathname),
      }

    case 'location:goTo':
      return {
        query: action.query,
        hash: action.hash,
        ...getRoute(action.pathname),
      }
  }

  return state
}

export const reduceGlobal = (state, action) => {
  switch (action.type) {
    case 'mutation:habitat:create':
      const site = state.resource.sites[action.siteId]
      const habitatId = site.habitats[site.habitats.length - 1]

      return {
        ...state,
        router: {
          hash: {},
          query: {
            strate: keyToLabel(action.layer),
          },
          ...getRoute(`habitat/${habitatId}`),
        },
      }

    case 'location:selectLayer':
      if (state.router.param.habitatId) {
        const strate = keyToLabel(action.layer)

        return {
          ...state,
          router: {
            hash: {},
            query: strate ? { strate } : {},
            ...getRoute(`habitat/${state.router.param.habitatId}`),
          },
        }
      }
  }

  return state
}
