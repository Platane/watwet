import { prepare } from '~/service/google-api/index'
import { getCurrentUser, signIn, signOut } from '~/service/google-api/auth'
import { authSuccess, authFail } from '~/store/action/auth'

export const init = store => {
  let preparing = false
  let connecting = false
  let prepared = false

  const tryPrepare = async state => {
    if (!preparing && !prepared && state.init.network && !state.offline) {
      preparing = true

      await prepare()

      preparing = false
      prepared = true

      if (prepared && getCurrentUser())
        store.dispatch(authSuccess(getCurrentUser()))

      update()
    }
  }

  const tryConnect = async state => {
    if (!connecting && prepared && state.auth.shouldConnect && !state.offline) {
      connecting = true

      try {
        await signIn()

        connecting = false
        store.dispatch(authSuccess(getCurrentUser()))
      } catch (err) {
        connecting = false
        store.dispatch(authFail(err))
      }
    }
  }

  const tryDisconnect = async state => {
    if (
      !connecting &&
      prepared &&
      state.auth.shouldDisconnect &&
      !state.offline
    ) {
      connecting = true

      try {
        await signOut()

        connecting = false
        store.dispatch(authSuccess(getCurrentUser()))
      } catch (err) {
        connecting = false
        store.dispatch(authFail(err))
      }
    }
  }

  const update = () => {
    tryPrepare(store.getState())
    tryConnect(store.getState())
    tryDisconnect(store.getState())
  }

  update()

  store.subscribe(update)
}
