import { routeValidator } from '~/service/router/routeValidator'
import { routes } from './routes'

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
