import { createSelector } from 'reselect'
import { getSite } from '~/service/normalize'
import {
  selectVegetal_byId,
  selectHabitat_byCodeCorindeBiotipe,
} from './dictionaries'

export const selectCurrentSiteId = state => state.router.param.siteId

export const selectCurrentSite = createSelector(
  selectVegetal_byId,
  selectHabitat_byCodeCorindeBiotipe,
  state => state.resource,
  selectCurrentSiteId,
  (vegetal_byId, habitat_byCodeCorindeBiotipe, cache, siteId) =>
    getSite(vegetal_byId, habitat_byCodeCorindeBiotipe, cache)(siteId)
)
