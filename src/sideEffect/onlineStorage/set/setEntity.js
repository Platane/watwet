import {
  selectVegetal_byId,
  selectHabitat_byCodeCorindeBiotipe,
} from '~/store/selector/dictionaries'
import {
  normalizeSite,
  getHabitat as getHabitatFromCache,
  getSite as getSiteFromCache,
} from '~/service/normalize'

import type { Site, Habitat } from 'type'

export const setEntity = api => async (key, getState) => {
  const [entity, id] = key.split('.')

  switch (entity) {
    case 'sites': {
      const { mutated, original } = getState().resource

      /**
       * as at creation the site are given temporary id until they acutally get created online,
       * keep track of the change of id
       */
      const idChanged = {}

      /**
       * for each new site ( ie, a site which is in mutated, but not in original )
       * create the site + track the id change ( update the idChanged object )
       */
      const newSiteKeys = await Promise.all(
        mutated.sites
          .filter(key => !original.sites.includes(key))
          .map(async key => {
            const { id: previousId, name } = mutated[key]

            const nextId = await api.site.create(name)

            idChanged[previousId] = nextId
          })
      )

      /**
       * re-fetch all the sites
       */
      const res = {
        sites: (await api.site.list()).map(({ id }) => `site.${id}`),
      }

      return { res, idChanged }
    }

    case 'site': {
      const state = getState()

      /**
       * read the site from the cache
       */
      const site: Site = getSiteFromCache(
        selectVegetal_byId(state),
        selectHabitat_byCodeCorindeBiotipe(state),
        state.resource
      )(id)

      /**
       * update the site
       */
      await api.site.set(site)

      /**
       * re-fetch the site
       */
      const res = normalizeSite(await api.site.get(id))

      return { res }
    }

    case 'habitat': {
      const state = getState()

      /**
       * read the habitat from the cache
       */
      const habitat: Habitat = getHabitatFromCache(
        selectVegetal_byId(state),
        selectHabitat_byCodeCorindeBiotipe(state),
        state.resource
      )(id)

      /**
       * update the habitat
       */
      await api.habitat.set(habitat.siteId, habitat.id, habitat)

      /**
       * re-fetch the site
       */
      const res = normalizeSite(await api.site.get(id))

      return { res }
    }
  }
}
