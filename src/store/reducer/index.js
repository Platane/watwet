import { combineReducers } from 'redux'
import { chainReducer } from '~/util/reduxHelper'
import {
  reduce as resource,
  reduceGlobal as resourceGlobal,
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
  reduce as setting,
  defaultState as settingDefaultState,
  reduceGlobal as settingGlobal,
  reduceEnhancer as settingEnhancer,
} from './setting'
import {
  reduce as auth,
  defaultState as authDefaultState,
  reducer2 as authGlobal,
} from './auth'
import { reduce as error, defaultState as errorDefaultState } from './error'
import { reduce as init, defaultState as initDefaultState } from './init'

export const reduce = chainReducer(
  settingEnhancer(
    combineReducers({
      resource,
      offline,
      setting,
      router,
      error,
      auth,
      init,
    })
  ),
  authGlobal,
  routerGlobal,
  resourceGlobal
)

export const defaultState = {
  setting: settingDefaultState,
  resource: resourceDefaultState,
  offline: offlineDefaultState,
  router: routerDefaultState,
  error: errorDefaultState,
  auth: authDefaultState,
  init: initDefaultState,
}
