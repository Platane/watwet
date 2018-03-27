import { hydrate } from '~/store/action/onlineStorage'

import {
  list as listSites,
  get as getSite,
  create as createSite,
} from '~/service/google-api/spreadSheets/site'
import { set as setHabitat } from '~/service/google-api/spreadSheets/habitat'

import { normalizeSite } from './normalize'

import { selectSpreadSheetApiReady } from '~/store/selector/spreadSheetApiReady'

export const init = store => {
  let pending = {}

  const update = async () => {
    const state = store.getState()

    if (!selectSpreadSheetApiReady(state)) return

    if (Object.keys(pending).some(key => pending[key])) return

    const { mutated } = state.resource

    Object.keys(mutated)
      .filter(key => !pending[key])
      .forEach(async key => {
        pending[key] = Date.now()

        const [entity, id] = key.split('.', 2)

        switch (entity) {
          case 'sites': {
            // TODO create site
          }

          case 'site': {
            // store.dispatch(hydrate({ [key]: await getSite(id) }))
            break
          }

          case 'habitat': {
            const habitat = mutated[key]
            await setHabitat(habitat.siteId, habitat.id, habitat)
            store.dispatch(
              hydrate(normalizeSite(await getSite(habitat.siteId)))
            )
            break
          }
        }

        pending[key] = null
      })
  }

  update()

  store.subscribe(update)
}
