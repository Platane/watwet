import { set } from '~/util/reduxHelper'
import type { State } from './type'
import type { State as GlobalState } from '../type'

export const defaultState = {
  user: null,
  connected: false,
  shouldConnect: false,
  shouldDisconnect: false,
}

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'auth:require:logout':
      return { ...state, shouldDisconnect: true }

    case 'auth:success':
      return { ...state, user: action.user, connected: !!action.user }

    case 'localStorage:read':
      return { ...state, user: state.user || action.user }

    default:
      return state
  }
}

export const reducer2 = (state: GlobalState, action): GlobalState => {
  const shouldConnect =
    !state.auth.connected &&
    state.init.network &&
    !state.offline &&
    state.resource.shouldRead

  if (shouldConnect !== state.auth.shouldConnect)
    return set(state, ['auth', 'shouldConnect'], shouldConnect)

  if (state.auth.shouldDisconnect && !state.auth.connected)
    return set(state, ['auth', 'shouldDisconnect'], false)

  return state
}
