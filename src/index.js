import 'unfetch/polyfill'

import Raven from 'raven-js'
import { SENTRY_DSN } from '~/config'

import { create } from './store/index'

import { init as initUi } from '~/sideEffect/ui'
import { init as initAuth } from '~/sideEffect/auth'
import { init as initNavigator } from '~/sideEffect/navigator'
import { init as initLocalStorage } from '~/sideEffect/localStorage'
import { init as initOnlineStorage } from '~/sideEffect/onlineStorage'
import { init as initServiceWorker } from '~/sideEffect/serviceWorker'
import { init as initSentryIdentity } from '~/sideEffect/sentryIdentity'
import { init as initOfflineDetector } from '~/sideEffect/offlineDetector'

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
  initAuth,
  initNavigator,
  initLocalStorage,
  initServiceWorker,
  initOnlineStorage,
  initSentryIdentity,
  initOfflineDetector,
  initUi,
]
Raven.context(() => create(sideEffects))
