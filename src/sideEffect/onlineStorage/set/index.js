import { hydrate, mutateError } from '~/store/action/onlineStorage'
import { selectSpreadsheetApiReady } from '~/store/selector/spreadsheetApiReady'
import { selectDitionariesReady } from '~/store/selector/dictionaries'
import { throttle } from '~/util/time'
import { setEntity } from './setEntity'
import type { Site, Habitat } from 'type'

const priorityFn = key =>
  [null, 'habitat', 'site', 'sites'].indexOf(key.split('.')[0]) || 0

/**
 * sort by hightest priority first
 */
const sortFn = (a, b) => priorityFn(b) - priorityFn(a)

export const init = api => async store => {
  let pending = false
  let failed = {}

  const update = async () => {
    const state = store.getState()
    const { mutated, mutationKey } = state.resource

    /**
     * if the api is not ready, ignore
     */
    if (!selectSpreadsheetApiReady(state) || !selectDitionariesReady(state))
      return

    /**
     * if something is already being mutated, ignore
     */
    if (pending) return

    /**
     * get the next thing that should be mutated
     * which is not currently pending
     * or which have not already failed
     */
    const key = Object.keys(mutated)
      .filter(key => failed[key] !== mutationKey[key])
      .sort(sortFn)
      .shift()

    if (!key) return

    /**
     * mark it as pending
     */
    const mKey = mutationKey[key]
    pending = mKey

    /**
     * set the entity
     * and dispatch the hydrate event, with notification of the mutationKey
     * or fails and dispatch an error event
     */
    try {
      const { res, idChanged } = await setEntity(api)(key, store.getState)
      const fromMutation = {}
      Object.keys(res).forEach(key => {
        fromMutation[key] = mutationKey[key]
      })
      store.dispatch(hydrate(res, fromMutation, idChanged))
    } catch (error) {
      failed[key] = mKey
      store.dispatch(mutateError(error, key, mKey))
    }

    /**
     * mark it as not longer pending
     * and loop to exhaust the list of thing that should be fetched
     */
    pending = null
    update()
  }

  const throttledUpdate = throttle(2000)(update)

  throttledUpdate()

  store.subscribe(throttledUpdate)
}
