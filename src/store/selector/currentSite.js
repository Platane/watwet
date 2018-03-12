import { createSelector } from 'reselect'

export const selectCurrentSite = createSelector(
  state => state.resource.mutated,
  state => state.resource.original,
  (mutated, original) => {
    const siteKey = Object.keys(original).filter(x => x.match(/^site\./))[0]

    const site = mutated[siteKey] || original[siteKey]

    if (!site) return null

    return {
      ...site,
      habitats: site.habitats
        .map(key => mutated[key] || original[key])
        .filter(Boolean),
    }
  }
)
