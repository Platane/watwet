import { combineReducers } from 'redux'

import { reduce as router, defaultState as routerDefaultState } from './router'
import {
  reduce as offline,
  defaultState as offlineDefaultState,
} from './offline'

export const reduce = combineReducers({
  router,
  offline,
})

export const defaultState = {
  router: routerDefaultState,
  offline: offlineDefaultState,
}
