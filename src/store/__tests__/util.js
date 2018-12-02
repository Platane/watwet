import 'unfetch/polyfill'

import { create as createStore } from '~/store/index'
import { init as initOnlineStorage } from '~/sideEffect/onlineStorage'
import * as api from '~/service/google-api/__mock/spreadsheets'

import { online } from '~/store/action/offline'
import { authSuccess } from '~/store/action/auth'
import { read as readStorage } from '~/store/action/localStorage'
import { goTo } from '~/store/action/router'

export const bootstrapStore = (url = '/') => {
  // init store
  const sideEffects = [
    //
    initOnlineStorage(api.__create()),
  ]

  const store = createStore(sideEffects)

  // init sideEffects
  store.dispatch(readStorage())
  store.dispatch(goTo(url))
  store.dispatch(online())
  store.dispatch(
    authSuccess({
      id: 'test',
      name: 'test',
    })
  )

  return store
}
