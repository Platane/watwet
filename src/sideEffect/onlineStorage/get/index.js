import { hydrate, fetchError } from '~/store/action/onlineStorage'
import { selectSpreadsheetApiReady } from '~/store/selector/spreadsheetApiReady'
import { getEntity } from './getEntity'

export const init = store => {
  let pending = {}
  let failed = {}

  const update = async () => {
    const state = store.getState()

    /**
     * if the api is not ready, ignore
     */
    if (!selectSpreadsheetApiReady(state)) return

    /**
     * get the next thing that should be fetched
     * which is not currently pending
     * or which have not already failed
     */
    const { shouldFetch } = state.resource
    const key = Object.keys(shouldFetch)
      .filter(key => !pending[key] && failed[key] !== shouldFetch[key])
      .shift()

    if (!key) return

    /**
     * mark it as pending
     */
    const shouldFetchKey = shouldFetch[key]
    pending[key] = shouldFetchKey

    /**
     * fetch the entity
     * and dispatch the hydrate event
     * or fails and dispatch an error event
     */
    try {
      const res = await getEntity(key, store.getState)
      store.dispatch(hydrate(res))
    } catch (error) {
      failed[key] = shouldFetchKey
      store.dispatch(fetchError(error, key, shouldFetchKey))
    }

    /**
     * mark it as not longer pending
     * and loop to exhaust the list of thing that should be fetched
     */
    pending[key] = null
    update()
  }

  update()

  store.subscribe(update)
}
