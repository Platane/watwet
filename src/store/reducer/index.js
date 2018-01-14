import { combineReducers } from 'redux'
import { chainReducer } from '~/util/reduxHelper'
import {
  reduce as resource,
  defaultState as resourceDefaultState,
} from './resource'
import {
  reduce as offline,
  defaultState as offlineDefaultState,
} from './offline'
import {
  reduce as router,
  defaultState as routerDefaultState,
  reduceGlobal as routerGlobal,
} from './router'
import {
  reduce as auth,
  defaultState as authDefaultState,
  reducer2 as authGlobal,
} from './auth'
import { reduce as init, defaultState as initDefaultState } from './init'

export const reduce = chainReducer(
  combineReducers({
    resource,
    offline,
    router,
    auth,
    init,
  }),
  authGlobal,
  routerGlobal
)

export const defaultState = {
  resource: resourceDefaultState,
  offline: offlineDefaultState,
  router: routerDefaultState,
  auth: authDefaultState,
  init: initDefaultState,
}
