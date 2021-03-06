import type { Layer, Site, Vegetal, Habitat } from 'type'

export type Site_Flat = {}
export type Habitat_Flat = {}
// export type Site_Flat = {
//   ...Site,
//   habitats: string[],
// }
// export type Habitat_Flat = {
//   ...Habitat,
//   population: {
//     vegetalId: string,
//     layer: Layer,
//     representation: number,
//   }[],
// }

export const normalizeSite = (site: Site) =>
  site.habitats.reduce(
    (o, habitat) => ({
      ...o,
      [`habitat.${habitat.id}`]: normalizeHabitat({
        ...habitat,
        siteId: site.id,
      }),
    }),

    {
      [`site.${site.id}`]: {
        ...site,
        habitats: site.habitats.map(habitat => `habitat.${habitat.id}`),
      },
    }
  )

export const normalizeHabitat = (
  habitat: Habitat | Habitat_Flat
): Habitat_Flat => ({
  ...habitat,
  population: habitat.population.map(
    x =>
      x.vegetalId
        ? x
        : {
            vegetalId: x.vegetal.id,
            layer: x.layer,
            representation: x.representation,
          }
  ),
})

const vegetalSortFn = (a, b) => {
  const ar = Math.round(a.representation * 10000)
  const br = Math.round(b.representation * 10000)

  if (ar > br) return -1
  if (ar < br) return 1

  return a.vegetal.id.toString() < b.vegetal.id.toString() ? 1 : -1
}

const hydrateHabitat = (
  vegetal_byId: { [string]: Vegetal },
  habitat_byCodeCorindeBiotipe: { [string]: Object }
) => (habitat: Habitat_Flat): Habitat => {
  const ref = habitat_byCodeCorindeBiotipe[habitat.info.codeCorineBiotipe]

  return {
    ...habitat,

    info: {
      ...habitat.info,
      codeEunis: (ref && ref.codeEunis) || '',
      naturalWet: !!(ref && ref.wet),
    },

    population: habitat.population
      .map(x => ({
        vegetal: vegetal_byId[x.vegetalId],
        layer: x.layer,
        representation: x.representation,
      }))
      .filter(x => x.vegetal)
      .sort(vegetalSortFn),
  }
}

export const getHabitat = (
  vegetal_byId,
  habitat_byCodeCorindeBiotipe,
  cache
) => habitatId => {
  const habitatKey = `habitat.${habitatId}`

  const habitat = cache.mutated[habitatKey] || cache.original[habitatKey]

  if (!habitat) return null

  return hydrateHabitat(vegetal_byId, habitat_byCodeCorindeBiotipe)(habitat)
}

export const getSite = (
  vegetal_byId,
  habitat_byCodeCorindeBiotipe,
  cache
) => siteId => {
  const siteKey = `site.${siteId}`

  const site = cache.mutated[siteKey] || cache.original[siteKey]

  if (!site) return null

  return {
    ...site,
    habitats: site.habitats
      .map(habitatKey => {
        const habitat = cache.mutated[habitatKey] || cache.original[habitatKey]

        if (!habitat) return

        return hydrateHabitat(vegetal_byId, habitat_byCodeCorindeBiotipe)(
          habitat
        )
      })
      .filter(Boolean),
  }
}
