import { createSelector } from 'reselect'
import { selectCurrentSiteId } from '../currentSite'

export const selectCurrentSiteFetching = createSelector(
  state => state.resource.shouldFetch,
  selectCurrentSiteId,
  (shouldFetch, siteId) => {
    if (!siteId) return false
    return !!shouldFetch[`sites.${siteId}`]
  }
)
