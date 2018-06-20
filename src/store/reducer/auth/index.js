import { set } from '~/util/reduxHelper'
import type { State } from './type'
import type { State as GlobalState } from '../type'

export const defaultState = {
  user: null,
  connected: false,
  pending: false,
  shouldConnect: false,
  shouldDisconnect: false,
}

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'auth:require:logout':
      return { ...state, shouldDisconnect: true, pending: true }

    case 'auth:require:login':
      return { ...state, shouldConnect: true, pending: true }

    case 'auth:fail':
    case 'auth:success':
      return {
        ...state,
        user: action.user || null,
        connected: !!action.user,
        pending: false,
        shouldConnect: false,
      }

    case 'declarative-router:navigatorChanged':
      if (action.hash && action.hash.id_token)
        return { ...state, pending: true }
      else return state

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
    state.resource.required.length > 0

  // if (shouldConnect !== state.auth.shouldConnect)
  //   return set(state, ['auth', 'shouldConnect'], !!shouldConnect)

  if (state.auth.shouldDisconnect && !state.auth.connected)
    return set(state, ['auth', 'shouldDisconnect'], false)

  return state
}
