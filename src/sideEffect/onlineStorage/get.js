import { hydrate } from '~/store/action/onlineStorage'

import {
  listId as listSitesId,
  get as getSite,
} from '~/service/google-api/spreadsheets/site'
import { get as getHabitatDirectory } from '~/service/google-api/spreadsheets/habitatDirectory'
import { get as getVegetalDictionary } from '~/service/google-api/spreadsheets/vegetalDictionary'
import { selectSpreadsheetApiReady } from '~/store/selector/spreadsheetApiReady'
import { normalizeSite } from '~/service/normalize'

export const init = store => {
  let pending = {}

  const update = async () => {
    const state = store.getState()

    if (!selectSpreadsheetApiReady(state)) return

    const { shouldFetch, original } = state.resource

    Object.keys(shouldFetch)
      .filter(key => !pending[key])
      .forEach(async key => {
        pending[key] = shouldFetch[key]

        const [entity, id] = key.split('.', 2)

        switch (entity) {
          case 'habitatDictionary': {
            const habitatDictionary = await getHabitatDirectory(
              state.setting.habitatDictionarySpreadsheetId
            )
            store.dispatch(hydrate({ habitatDictionary }))
            break
          }

          case 'vegetalDictionary': {
            const vegetalDictionary = await getVegetalDictionary(
              state.setting.vegetalDictionarySpreadsheetId
            )
            store.dispatch(hydrate({ vegetalDictionary }))
            break
          }

          case 'sites': {
            store.dispatch(
              hydrate({ sites: (await listSitesId()).map(id => `site.${id}`) })
            )
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
