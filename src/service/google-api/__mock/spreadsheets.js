import { genUid } from '~/util/uid'
import { removeDuplicateId } from '~/util/array'
import { sites as sitesFixtures } from '~/__fixtures__/sites'
import { vegetals } from '~/__fixtures__/vegetals'

const wait = delay => new Promise(r => setTimeout(r, delay))

const delayApiFn = o => {
  if (typeof o === 'function')
    return (...args) => wait(30).then(() => o(...args))

  if (typeof o === 'object') {
    const copy = {}
    Object.keys(o).forEach(key => {
      copy[key] = delayApiFn(o[key])
    })
    return copy
  }

  return o
}

const __create = () => {
  const site = {}
  sitesFixtures.slice(0, 6).forEach(s => {
    site[s.id] = s
  })

  return delayApiFn({
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
        if (!site[siteId]) return new Error(404)

        const habitats = removeDuplicateId([...site[siteId].habitats, habitat])

        site[id] = { ...site[id], habitats }
      },
    },
    habitatDictionary: {
      get: () => [
        {
          codeCorineBiotipe: 'A',
          codeEunis: 'A',
          canonicalName: 'x',
          wet: false,
        },
      ],
    },
    vegetalDictionary: {
      get: () => vegetals,
    },
    __reset: () => {
      site.length = 0
    },
  })
}

module.exports = { ...__create(), __create }
