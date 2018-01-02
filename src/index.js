import 'unfetch/polyfill'

import Raven from 'raven-js'
import { SENTRY_DSN } from '~/config'

import { create } from './store/index'

import { init as initUi } from '~/sideEffect/ui'
import { init as initNavigator } from '~/sideEffect/navigator'
import { init as initOfflineDetector } from '~/sideEffect/offlineDetector'
// import { init as initStorage } from '~/sideEffect/storage'
import { init as initServiceWorker } from '~/sideEffect/serviceWorker'

import { prepare } from './service/google-api'
import { getCurrentUser, signIn } from './service/google-api/auth'
import { read } from '~/service/google-api/spreadSheets/vegetalDictionary'

const run = async () => {
  await prepare()

  console.log(getCurrentUser())

  if (!getCurrentUser()) await signIn()

  console.log(await read())
}

run()

// init raven
if (SENTRY_DSN) {
  Raven.config(SENTRY_DSN, { release: process.env.VERSION }).install()
  Raven.setTagsContext({
    host: window.location && window.location.hostname,
  })
  window.Raven = Raven
}

// init store
const sideEffects = [
  initOfflineDetector,
  initUi,
  // initStorage,
  initNavigator,
  initServiceWorker,
]
Raven.context(() => create(sideEffects))
