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
import { init as initOfflineDetector } from '~/sideEffect/offlineDetector'

import { prepare } from './service/google-api'
import { getCurrentUser, signIn } from './service/google-api/auth'
import { read } from '~/service/google-api/spreadSheets/vegetalDictionary'
import { list, get, set } from '~/service/google-api/spreadSheets/site'

import { sites } from '~/__fixtures__/sites'

const run = async () => {
  await prepare()

  console.log(getCurrentUser())

  if (!getCurrentUser()) await signIn()

  // console.log(await read())

  const asites = await list()

  // console.log(await get(sites[0].id))

  const s = sites[0]
  s.id = asites[0].id
  await set(s)
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
  initUi,
  initAuth,
  initNavigator,
  initLocalStorage,
  initServiceWorker,
  initOnlineStorage,
  initOfflineDetector,
]
Raven.context(() => create(sideEffects))
