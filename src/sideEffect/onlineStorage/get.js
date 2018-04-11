import { hydrate, fetchError } from '~/store/action/onlineStorage'

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

        let promise

        switch (entity) {
          case 'habitatDictionary':
            promise = getHabitatDirectory(
              state.setting.habitatDictionarySpreadsheetId
            )
              .then(habitatDictionary =>
                store.dispatch(hydrate({ habitatDictionary }))
              )
              .catch()
            break

          case 'vegetalDictionary':
            promise = getVegetalDictionary(
              state.setting.vegetalDictionarySpreadsheetId
            ).then(vegetalDictionary =>
              store.dispatch(hydrate({ vegetalDictionary }))
            )
            break

          case 'sites':
            promise = listSitesId()
              .then(res => res.map(id => `site.${id}`))
              .then(sites => hydrate({ sites }))
            break

          case 'site':
            promise = getSite(id).then(site =>
              store.dispatch(hydrate(normalizeSite(site)))
            )
            break
        }

        if (promise)
          promise.catch(error =>
            store.dispatch(fetchError(error, key, shouldFetch[key]))
          )

        await promise

        pending[key] = null
      })
  }

  update()

  store.subscribe(update)
}
