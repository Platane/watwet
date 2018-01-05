import {
  hydrateVegetalDictionary,
  hydrateSites,
} from '~/store/action/onlineStorage'

import { list, get } from '~/service/google-api/spreadSheets/site'

import { vegetals } from '~/__fixtures__/vegetals'
import { habitats } from '~/__fixtures__/habitats'

export const init = store => {
  let pending = false

  const update = async () => {
    const state = store.getState()

    if (
      !pending &&
      state.init.network &&
      !state.offline &&
      state.auth.connected &&
      state.resource.shouldRead
    ) {
      pending = true

      store.dispatch(
        hydrateSites(await Promise.all((await list()).map(({ id }) => get(id))))
      )

      pending = false
    }
  }

  update()

  store.subscribe(update)

  store.dispatch(hydrateVegetalDictionary(vegetals))
}
