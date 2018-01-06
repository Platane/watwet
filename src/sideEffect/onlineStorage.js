import {
  hydrateVegetalDictionary,
  hydrateSites,
  hydrateHabitatCanonicalNames,
} from '~/store/action/onlineStorage'

import {
  list as listSites,
  get as getSite,
  create as createSite,
} from '~/service/google-api/spreadSheets/site'
import { get as getHabitatCanonicalNames } from '~/service/google-api/spreadSheets/habitatCanonicalNames'

import { vegetals } from '~/__fixtures__/vegetals'
import { habitats } from '~/__fixtures__/habitats'

const getSites = async () => {
  const sites = await listSites()

  if (sites.length) return await Promise.all(sites.map(({ id }) => getSite(id)))

  return [await createSite('0')]
}

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

      store.dispatch(hydrateSites(await getSites()))

      store.dispatch(
        hydrateHabitatCanonicalNames(await getHabitatCanonicalNames())
      )

      pending = false
    }
  }

  update()

  store.subscribe(update)

  store.dispatch(hydrateVegetalDictionary(vegetals))
}
