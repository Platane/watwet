import { online, offline } from '~/store/action/offline'

export const init = store => {
  const onChange = () => store.dispatch(navigator.onLine ? online() : offline())

  window.addEventListener('online', onChange)
  window.addEventListener('offline', onChange)

  onChange()
}
