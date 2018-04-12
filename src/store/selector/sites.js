import { createSelector } from 'reselect'
import { getSite } from '~/service/normalize'
import {
  selectVegetal_byId,
  selectHabitat_byCodeCorindeBiotipe,
} from './dictionaries'

export const selectSites = createSelector(
  state => state.resource,
  selectVegetal_byId,
  selectHabitat_byCodeCorindeBiotipe,
  (cache, vegetal_byId, selectHabitat_byCodeCorindeBiotipe) => {
    const key = 'sites'

    const sites = cache.mutated[key] || cache.original[key] || []

    return sites
      .map(key =>
        getSite(vegetal_byId, selectHabitat_byCodeCorindeBiotipe, cache)(
          key.split('.')[1]
        )
      )
      .filter(Boolean)
  }
)
