import { genIUid, genUid } from '~/util/uid'
import { normalizeHabitat } from '~/service/normalize'

export const updateHabitat = habitat => ({
  type: 'mutation:habitat:update',
  habitat: normalizeHabitat(habitat),
  date: Date.now(),
})

export const removeHabitat = (siteId, habitatId) => ({
  type: 'mutation:habitat:remove',
  siteId,
  habitatId,
  date: Date.now(),
})

export const createHabitat = (siteId, habitat) => ({
  type: 'mutation:habitat:create',
  siteId,
  habitat: {
    id: genIUid(),
    info: {},
    population: [],
    ...habitat,
  },
  date: Date.now(),
})

export const createSite = site => ({
  type: 'mutation:site:create',
  site: {
    id: genUid(),
    ...site,
    habitats: [],
  },
  date: Date.now(),
})
