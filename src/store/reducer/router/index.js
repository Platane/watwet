import { routeValidator } from '~/service/router/routeValidator'
import { routes } from './routes'
import { getId } from '~/service/google-api/spreadSheets/site/parse/habitat'

import type { State } from './type'

const getRoute = routeValidator(routes)

export const defaultState = getRoute('/')

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'location:changed':
      return getRoute(action.pathname)

    case 'location:goTo':
      return getRoute(action.path)
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
        router: getRoute(`habitat/${habitatId}`),
      }
  }

  return state
}
