import { hydrate } from '~/store/action/onlineStorage'

import {
  list as listSites,
  get as getSite,
  create as createSite,
} from '~/service/google-api/spreadSheets/site'
import { get as getHabitatDirectory } from '~/service/google-api/spreadSheets/habitatDirectory'
import { get as getVegetalDictionary } from '~/service/google-api/spreadSheets/vegetalDictionary'

const getSites = async () => {
  const sites = await listSites()

  if (sites.length) return await Promise.all(sites.map(({ id }) => getSite(id)))

  return [await createSite('0')]
}

export const init = store => {
  let pending = {}

  const update = async () => {
    const state = store.getState()

    if (state.init.network && !state.offline && state.auth.connected) {
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
              let sites = await listSites()

              if (sites.length === 0) {
                await createSite('0')
                sites = await listSites()
              }

              store.dispatch(hydrate({ sites: sites.map(x => `site.${x.id}`) }))
              break
            }

            case 'site': {
              store.dispatch(hydrate({ [key]: await getSite(id) }))
              break
            }
          }

          pending[key] = null
        })
    }
  }

  update()

  store.subscribe(update)
}
