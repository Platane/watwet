import { genUid } from '~/util/uid'
import { sites as sitesFixtures } from '~/__fixtures__/sites'
import { vegetals } from '~/__fixtures__/vegetals'

const __create = () => {
  const site = {}
  sitesFixtures.slice(0, 6).forEach(s => {
    site[s.id] = s
  })

  return {
    site: {
      get: id => {
        if (!site[id]) throw new Error(404)
        return site[id]
      },
      set: site => {
        if (!site[id]) throw new Error(404)
        site[site.id] = site
      },
      list: () => Object.keys(site).map(id => ({ id })),
      create: name => {
        const id = genUid()

        site[id] = { id, name }

        return id
      },
    },
    habitat: {
      set: (siteId, habitatId, habitat) => {
        if (!site[id]) return new Error(404)

        const habitats = site[id].habitats.some(({ id }) => id === habitatId)
          ? site[id].habitats.map(x => (x.id === habitatId ? habitat : x))
          : [...site[id].habitats, habitat]

        site[id] = { ...site[id], habitats }
      },
    },
    habitatDictionary: {
      get: () => [],
    },
    vegetalDictionary: {
      get: () => vegetals,
    },
    __reset: () => {
      site.length = 0
    },
  }
}

module.exports = { ...__create(), __create }
