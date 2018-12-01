import { online, offline } from '~/store/action/offline'

/**
 * detect when the app goes offline / online
 * relies on "navigator.onLine" and "online" / "offline" browser event
 */

export const init = store => {
  const onChange = () => store.dispatch(navigator.onLine ? online() : offline())

  window.addEventListener('online', onChange)
  window.addEventListener('offline', onChange)

  onChange()
}
