import { siteDiff } from '~/service/diff/site'
import { createSelector } from 'reselect'
import { selectCurrentSiteId } from '../currentSite'
import { getSite } from '~/service/normalize'
import { selectVegetal_byId } from '../dictionaries'

export const selectCurrentSiteDiff = createSelector(
  state => state.resource,
  selectVegetal_byId,
  selectCurrentSiteId,
  (cache, vegetal_byId, siteId) => {
    if (!siteId) return []

    const originalCache = { ...cache, mutated: {} }

    const a = getSite(vegetal_byId, originalCache)(siteId)
    const b = getSite(vegetal_byId, cache)(siteId)

    return siteDiff(a, b)
  }
)
