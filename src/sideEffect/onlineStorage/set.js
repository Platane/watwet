import { hydrate } from '~/store/action/onlineStorage'

import {
  list as listSites,
  get as getSite,
  create as createSite,
} from '~/service/google-api/spreadSheets/site'
import { set as setHabitat } from '~/service/google-api/spreadSheets/habitat'
import { selectSpreadSheetApiReady } from '~/store/selector/spreadSheetApiReady'
import {
  selectVegetal_byId,
  selectDitionariesReady,
} from '~/store/selector/dictionaries'
import { normalizeSite, getHabitat } from '~/service/normalize'

export const init = store => {
  let pending = {}

  const update = async () => {
    const state = store.getState()

    if (!selectSpreadSheetApiReady(state) || !selectDitionariesReady(state))
      return

    if (Object.keys(pending).some(key => pending[key])) return

    const { mutated, dateMutated } = state.resource

    Object.keys(mutated)
      .filter(key => !pending[key])
      .forEach(async key => {
        pending[key] = Date.now()

        const [entity, id] = key.split('.', 2)

        switch (entity) {
          case 'sites': {
            // TODO create site
            // const sites = await  listSites()
          }

          case 'site': {
            // const site = {
            //   ...mutated[key],
            //   habitats: mutated[key].map(key => mutated[key] || original[key])
            //   .filter(Boolean),
            //
            // const

            break
          }

          case 'habitat': {
            const habitat: Habitat = getHabitat(
              selectVegetal_byId(state),
              state.resource
            )(id)

            await setHabitat(habitat.siteId, habitat.id, habitat)

            const site = await getSite(habitat.siteId)

            const fromMutation = { [key]: dateMutated[key] }

            store.dispatch(
              hydrate(
                normalizeSite(await getSite(habitat.siteId)),
                fromMutation
              )
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
