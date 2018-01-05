import { createSelector } from 'reselect'
import { sites, habitats } from './primitive'

export const selectCurrentSite = createSelector(
  sites,
  habitats,
  (sites, habitats) => {
    const site = sites[Object.keys(sites)[0]]

    if (!site) return null

    return {
      ...site,
      habitats: site.habitats.map(id => habitats[id]).filter(Boolean),
    }
  }
)
