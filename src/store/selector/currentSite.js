import { createSelector } from 'reselect'
import { getSite } from '~/service/normalize'
import { selectVegetal_byId } from './dictionaries'

export const selectCurrentSiteId = state => state.router.param.siteId

export const selectCurrentSite = createSelector(
  state => state.resource,
  selectVegetal_byId,
  selectCurrentSiteId,
  (cache, vegetal_byId, siteId) => getSite(vegetal_byId, cache)(siteId)
)
