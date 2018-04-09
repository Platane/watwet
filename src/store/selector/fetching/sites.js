import { createSelector } from 'reselect'
import { selectCurrentSiteId } from '../currentSite'

export const selectSitesFetching = state => state.resource.shouldFetch['sites']
