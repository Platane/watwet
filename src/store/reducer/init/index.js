import { set } from '~/util/reduxHelper'
import type { State } from './type'

export const defaultState = {
  localStorage: false,
  navigator: false,
  network: false,
}

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'localStorage:read':
      return { ...state, localStorage: true }

    case 'declarative-router:navigatorChanged':
      return { ...state, navigator: true }

    case 'network:online':
    case 'network:offline':
      return { ...state, network: true }

    default:
      return state
  }
}
