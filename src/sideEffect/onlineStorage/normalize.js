import type { Site } from 'type'

export const normalizeSite = (site: Site) =>
  site.habitats.reduce(
    (o, habitat) => ({
      ...o,
      [`habitat.${habitat.id}`]: { ...habitat, siteId: site.id },
    }),

    {
      [`site.${site.id}`]: {
        ...site,
        habitats: site.habitats.map(habitat => `habitat.${habitat.id}`),
      },
    }
  )
