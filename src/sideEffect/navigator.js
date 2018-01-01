import { locationChanged } from '~/store/action/router'
// import { deepEqual } from '~/util/object'
import { pushState, replaceState, getLocation } from '~/service/navigator'

export const init = store => {
  window.addEventListener('popstate', () =>
    store.dispatch(locationChanged(getLocation()))
  )

  const update = () => {
    const { path, param } = store.getState().router
    const location = getLocation()

    if (path != location.pathname) pushState(path)

    // if (!deepEqual({}, location.query)) replaceState(path)
    //
    // if (!deepEqual({}, location.hash)) replaceState(path)
  }

  store.dispatch(locationChanged(getLocation()))

  update()

  store.subscribe(update)
}
