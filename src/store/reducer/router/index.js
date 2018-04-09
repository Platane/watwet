import { routeValidator } from '~/service/router/routeValidator'
import { routes } from './routes'
import { set } from '~/util/reduxHelper'
import { keyToLabel } from '~/store/selector/currentLayer'
import { selectCurrentHabitatId } from '~/store/selector/currentHabitat'
import { selectCurrentSiteId } from '~/store/selector/currentSite'

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
        ...getRoute(action.path),
      }
  }

  return state
}

export const reduceGlobal = (state, action) => {
  switch (action.type) {
    case 'mutation:habitat:create': {
      const site = state.resource.mutated[`site.${action.siteId}`]
      const habitatId = site.habitats[site.habitats.length - 1].split('.', 2)[1]

      state = {
        ...state,
        router: {
          hash: {},
          query: {},
          ...getRoute(`site/${site.id}/habitat/${habitatId}`),
        },
      }
      break
    }

    case 'mutation:site:create':
      return {
        ...state,
        router: {
          hash: {},
          query: {},
          ...getRoute(`site/${action.site.id}`),
        },
      }

    case 'resource:online:read': {
      if (action.idChanged && action.idChanged[state.router.param.siteId])
        return {
          ...state,
          router: {
            ...state.router,
            ...getRoute(
              state.router.path.replace(
                state.router.param.siteId,
                action.idChanged[state.router.param.siteId]
              )
            ),
          },
        }

      break
    }

    case 'location:selectLayer': {
      if (selectCurrentHabitatId(state)) {
        const strate = keyToLabel(action.layer)

        const siteId = selectCurrentSiteId(state)
        const habitatId = selectCurrentHabitatId(state)

        state = {
          ...state,
          router: {
            hash: {},
            query: strate ? { strate } : {},
            ...getRoute(`site/${siteId}/habitat/${habitatId}`),
          },
        }
      }
      break
    }
  }

  if (state.router.key == 'habitat' && !state.router.query.strate)
    state = set(state, ['router', 'query', 'strate'], 'arboree')

  return state
}
