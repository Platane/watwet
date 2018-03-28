import { hydrate } from '~/store/action/onlineStorage'

import {
  list as listSites,
  get as getSite,
} from '~/service/google-api/spreadSheets/site'
import { get as getHabitatDirectory } from '~/service/google-api/spreadSheets/habitatDirectory'
import { get as getVegetalDictionary } from '~/service/google-api/spreadSheets/vegetalDictionary'
import { selectSpreadSheetApiReady } from '~/store/selector/spreadSheetApiReady'
import { normalizeSite } from '~/service/normalize'

export const init = store => {
  let pending = {}

  const update = async () => {
    const state = store.getState()

    if (!selectSpreadSheetApiReady(state)) return

    const { required, original } = state.resource

    required
      .filter(key => !original[key] && !pending[key])
      .forEach(async key => {
        pending[key] = Date.now()

        const [entity, id] = key.split('.', 2)

        switch (entity) {
          case 'habitatDictionary': {
            const habitatDictionary = await getHabitatDirectory()
            store.dispatch(hydrate({ habitatDictionary }))
            break
          }

          case 'vegetalDictionary': {
            const vegetalDictionary = await getVegetalDictionary()
            store.dispatch(hydrate({ vegetalDictionary }))
            break
          }

          case 'sites': {
            const sites = await listSites()
            store.dispatch(hydrate({ sites: sites.map(x => `site.${x.id}`) }))
            break
          }

          case 'site': {
            store.dispatch(hydrate(normalizeSite(await getSite(id))))
            break
          }
        }

        pending[key] = null
      })
  }

  update()

  store.subscribe(update)
}
