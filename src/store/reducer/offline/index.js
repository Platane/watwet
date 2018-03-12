import type { State } from './type'

export const defaultState = true

export const reduce = (state: State, action): State => {
  state = state === false || state ? state : defaultState

  switch (action.type) {
    case 'network:online':
      return false

    case 'network:offline':
      return true

    default:
      return state
  }
}
