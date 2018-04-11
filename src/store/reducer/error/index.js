import { genUid } from '~/util/uid'
import type { State } from './type'

export const defaultState = []

export const reduce = (state: State, action): State => {
  state = state || defaultState

  switch (action.type) {
    case 'resource:online:read:error':
      return [
        ...state,
        { ...action, type: 'fetch', id: genUid(), date: Date.now() },
      ]
    case 'auth:fail':
      return [
        ...state,
        { ...action, type: 'auth', id: genUid(), date: Date.now() },
      ]
    default:
      return state
  }
}
