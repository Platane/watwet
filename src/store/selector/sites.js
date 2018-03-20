import { createSelector } from 'reselect'

export const selectSites = createSelector(
  state => state.resource.mutated,
  state => state.resource.original,
  (mutated, original) => {
    const key = 'sites'

    const sites = mutated[key] || original[key] || []

    return sites.map(key => mutated[key] || original[key]).filter(Boolean)
  }
)
