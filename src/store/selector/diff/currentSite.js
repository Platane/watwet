import { siteDiff } from '~/service/diff/site'
import { createSelector } from 'reselect'
import { selectCurrentSite, selectCurrentSiteId } from '../currentSite'
import { getSite } from '~/service/normalize'
import { selectVegetal_byId } from '../dictionaries'

export const selectCurrentSiteDiff = createSelector(
  state => state.resource,
  selectVegetal_byId,
  selectCurrentSiteId,
  selectCurrentSite,
  (cache, vegetal_byId, siteId, b) => {
    if (!siteId) return []

    const originalCache = { ...cache, mutated: {} }

    const a = getSite(vegetal_byId, originalCache)(siteId)

    return (a && b && siteDiff(a, b)) || []
  }
)
