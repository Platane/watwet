import 'unfetch/polyfill'

import Raven from 'raven-js'
import { SENTRY_DSN } from '~/config'

import { create as createStore } from './store/index'

import { init as initUi } from '~/sideEffect/ui'
import { init as initAuth } from '~/sideEffect/auth'
import { init as initNavigator } from '~/sideEffect/navigator'
import { init as initLocalStorage } from '~/sideEffect/localStorage'
import { init as initOnlineStorage } from '~/sideEffect/onlineStorage'
import { init as initServiceWorker } from '~/sideEffect/serviceWorker'
import { init as initSentryIdentity } from '~/sideEffect/sentryIdentity'
import { init as initOfflineDetector } from '~/sideEffect/offlineDetector'

import * as ReselectTools from 'reselect-tools'
import * as selectors from './store/selector'

// init raven
if (SENTRY_DSN) {
  Raven.config(SENTRY_DSN, { release: process.env.VERSION || 'dev' }).install()
  Raven.setTagsContext({
    host: window.location && window.location.hostname,
  })
  window.Raven = Raven
}

// init store
const sideEffects = [
  initLocalStorage,
  initSentryIdentity,
  initAuth,
  initNavigator,
  initServiceWorker,
  initOnlineStorage,
  initOfflineDetector,
  initUi,
]
Raven.context(() => {
  const store = createStore(sideEffects)

  ReselectTools.getStateWith(() => store.getState())
})

// init reselect-tools
const renameSelectors = o => {
  const c = {}
  Object.keys(o).forEach(key => (c[key.match(/^(select)?(.*)$/)[2]] = o[key]))
  return c
}
ReselectTools.registerSelectors(renameSelectors(selectors))
