import { createSelector } from 'reselect'

export const selectCurrentSiteId = state => state.router.param.siteId

export const selectCurrentSite = createSelector(
  state => state.resource.mutated,
  state => state.resource.original,
  selectCurrentSiteId,
  (mutated, original, siteId) => {
    const key = siteId && `site.${siteId}`

    const site = key && (mutated[key] || original[key])

    return site
      ? {
          ...site,
          habitats: site.habitats
            .map(key => mutated[key] || original[key])
            .filter(Boolean),
        }
      : null
  }
)
