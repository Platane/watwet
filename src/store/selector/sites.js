import { createSelector } from 'reselect'
import { getSite } from '~/service/normalize'
import { selectVegetal_byId } from './dictionaries'

export const selectSites = createSelector(
  state => state.resource,
  selectVegetal_byId,
  (cache, vegetal_byId) => {
    const key = 'sites'

    const sites = cache.mutated[key] || cache.original[key] || []

    return sites
      .map(key => getSite(vegetal_byId, cache)(key.split('.')[1]))
      .filter(Boolean)
  }
)
