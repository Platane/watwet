import { hydrate } from '~/store/action/onlineStorage'

import {
  listId as listSitesId,
  set as setSite,
  get as getSite,
  create as createSite,
} from '~/service/google-api/spreadsheets/site'
import { set as setHabitat } from '~/service/google-api/spreadsheets/habitat'
import { selectSpreadsheetApiReady } from '~/store/selector/spreadsheetApiReady'
import {
  selectVegetal_byId,
  selectHabitat_byCodeCorindeBiotipe,
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
  let pending = false

  const update = async () => {
    const state = store.getState()

    if (
      !selectSpreadsheetApiReady(state) ||
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
        const siteKeys = state.resource.mutated.sites.filter(
          key => !state.resource.original.sites.includes(key)
        )

        const idChanged = {}

        for (let i = 0; i < siteKeys.length; i++) {
          const previousId = siteKeys[i].split('.', 2)[1]

          const name = state.resource.mutated[siteKeys[i]].name

          const nextId = await createSite(name)

          idChanged[previousId] = nextId
        }

        const fromMutation = {
          [key]: state.resource.dateMutated[key],
        }

        store.dispatch(
          hydrate(
            { sites: (await listSitesId()).map(id => `site.${id}`) },
            fromMutation,
            idChanged
          )
        )

        break
      }

      case 'site': {
        pending = key

        const site: Site = getSiteFromCache(
          selectVegetal_byId(state),
          selectHabitat_byCodeCorindeBiotipe(state),
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
          selectHabitat_byCodeCorindeBiotipe(state),
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

  const throttledUpdate = throttle(2000)(update)

  throttledUpdate()

  store.subscribe(throttledUpdate)
}
