/* global navigator */
import { PATHNAME_BASE } from '~/config'

const swPath = '/sw.js'

export const init = () => {
  if (
    'undefined' === typeof navigator ||
    !navigator.serviceWorker ||
    'function' !== typeof navigator.serviceWorker.register
  )
    return

  return navigator.serviceWorker.register(swPath, { scope: PATHNAME_BASE })
}
