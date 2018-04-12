import { createSelector } from 'reselect'
import { getSite } from '~/service/normalize'
import {
  selectVegetal_byId,
  selectHabitat_byCodeCorindeBiotipe,
} from './dictionaries'

export const selectCurrentSiteId = state => state.router.param.siteId

export const selectCurrentSite = createSelector(
  state => state.resource,
  selectVegetal_byId,
  selectHabitat_byCodeCorindeBiotipe,
  selectCurrentSiteId,
  (cache, vegetal_byId, habitat_byCodeCorindeBiotipe, siteId) =>
    getSite(vegetal_byId, habitat_byCodeCorindeBiotipe, cache)(siteId)
)
