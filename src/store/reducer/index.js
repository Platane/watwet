import { combineReducers } from 'redux'

import {
  reduce as resource,
  defaultState as resourceDefaultState,
} from './resource'
import {
  reduce as offline,
  defaultState as offlineDefaultState,
} from './offline'
import { reduce as router, defaultState as routerDefaultState } from './router'

export const reduce = combineReducers({
  resource,
  offline,
  router,
})

export const defaultState = {
  resource: resourceDefaultState,
  offline: offlineDefaultState,
  router: routerDefaultState,
}
