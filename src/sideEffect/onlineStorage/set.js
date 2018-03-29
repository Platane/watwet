import { hydrate } from '~/store/action/onlineStorage'

import {
  list as listSites,
  set as setSite,
  get as getSite,
  create as createSite,
} from '~/service/google-api/spreadSheets/site'
import { set as setHabitat } from '~/service/google-api/spreadSheets/habitat'
import { selectSpreadSheetApiReady } from '~/store/selector/spreadSheetApiReady'
import {
  selectVegetal_byId,
  selectDitionariesReady,
} from '~/store/selector/dictionaries'
import {
  normalizeSite,
  getHabitat as getHabitatFromCache,
  getSite as getSiteFromCache,
} from '~/service/normalize'
import { throttle } from '~/util/time'

import type { Site, Habitat } from 'type'

const priorityFn = key =>
  [null, 'habitat', 'site', 'sites'].indexOf(key.split('.')[0]) || 0

const sortFn = (a, b) => (priorityFn(a) < priorityFn(b) ? 1 : -1)

export const init = async store => {
  // let pending = {}
  let pending = false

  const update = async () => {
    const state = store.getState()

    if (
      !selectSpreadSheetApiReady(state) ||
      !selectDitionariesReady(state) ||
      pending
    )
      return

    // next key
    const key = Object.keys(state.resource.mutated)
      .sort(sortFn)
      .shift()

    if (!key) return

    const [entity, id] = key.split('.', 2)

    switch (entity) {
      case 'sites': {
        // TODO create site
        // const sites = await  listSites()
      }

      case 'site': {
        pending = key

        const site: Site = getSiteFromCache(
          selectVegetal_byId(state),
          state.resource
        )(id)

        await setSite(site)

        const fromMutation = {
          [key]: state.resource.dateMutated[key],
        }
        site.habitats
          .map(habitat => `habitat.${habitat.id}`)
          .forEach(key => (fromMutation[key] = state.resource.dateMutated[key]))

        store.dispatch(hydrate(normalizeSite(await getSite(id)), fromMutation))

        break
      }

      case 'habitat': {
        pending = key

        const habitat: Habitat = getHabitatFromCache(
          selectVegetal_byId(state),
          state.resource
        )(id)

        await setHabitat(habitat.siteId, habitat.id, habitat)

        const fromMutation = {
          [key]: state.resource.dateMutated[key],
        }

        store.dispatch(
          hydrate(normalizeSite(await getSite(habitat.siteId)), fromMutation)
        )
        break
      }
    }

    pending = null
    update()
  }

  const throttledUpdate = throttle(1000)(update)

  throttledUpdate()

  store.subscribe(throttledUpdate)
}
