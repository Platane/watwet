import { keyToLabel } from '~/store/selector/currentLayer'
import {
  selectCurrentHabitat,
  selectCurrentHabitatId,
} from '~/store/selector/currentHabitat'
import {
  selectCurrentSite,
  selectCurrentSiteId,
} from '~/store/selector/currentSite'

import { reduce as createReduce, createRouteResolver } from 'declarative-router'
import { routes } from './routes'
import { set } from '~/util/reduxHelper'
import type { State } from './type'

const getRoute = createRouteResolver(routes)

const setRoute = state => (path, query = {}, hash = {}) => ({
  ...state,
  router: {
    hash,
    query,
    ...getRoute(path),
  },
})

export const defaultState = {
  hash: {},
  query: {},
  ...getRoute('/'),
}

export const reduce = createReduce(routes)

export const reduceGlobal = (state, action) => {
  switch (action.type) {
    case 'mutation:habitat:create': {
      const site = state.resource.mutated[`site.${action.siteId}`]
      const habitatId = site.habitats[site.habitats.length - 1].split('.', 2)[1]

      state = setRoute(state)(`site/${site.id}/habitat/${habitatId}`)
      break
    }

    case 'mutation:habitat:update': {
      if (state.router.key === 'habitatEdit')
        state = setRoute(state)(
          `site/${action.habitat.siteId}/habitat/${action.habitat.id}`
        )
      break
    }

    case 'mutation:habitat:remove': {
      if (state.router.key === 'habitatEdit')
        state = setRoute(state)(`site/${action.siteId}`)

      break
    }

    case 'mutation:site:create':
      state = setRoute(state)(`site/${action.site.id}`)
      break

    case 'resource:online:read': {
      if (action.idChanged && action.idChanged[state.router.param.siteId]) {
        const newPath = state.router.path.replace(
          state.router.param.siteId,
          action.idChanged[state.router.param.siteId]
        )

        state = setRoute(state)(newPath, state.router.query, state.router.hash)
      }
      break
    }

    case 'location:selectLayer': {
      if (selectCurrentHabitatId(state)) {
        const strate = keyToLabel(action.layer)

        const siteId = selectCurrentSiteId(state)
        const habitatId = selectCurrentHabitatId(state)

        state = setRoute(state)(
          `site/${siteId}/habitat/${habitatId}`,
          strate ? { strate } : {}
        )
      }
      break
    }
  }

  // force strate query
  if (
    state.router.key == 'habitat' &&
    !['arboree', 'arbustive', 'herbacee'].includes(state.router.query.strate)
  )
    state = set(state, ['router', 'query', 'strate'], 'arboree')

  return state
}
