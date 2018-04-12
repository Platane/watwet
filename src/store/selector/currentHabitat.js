import { createSelector } from 'reselect'
import { getHabitat } from '~/service/normalize'
import {
  selectVegetal_byId,
  selectHabitat_byCodeCorindeBiotipe,
} from './dictionaries'

export const selectCurrentHabitatId = state => state.router.param.habitatId

export const selectCurrentHabitat = createSelector(
  state => state.resource,
  selectVegetal_byId,
  selectHabitat_byCodeCorindeBiotipe,
  selectCurrentHabitatId,
  (cache, vegetal_byId, habitat_byCodeCorindeBiotipe, habitatId) =>
    getHabitat(vegetal_byId, habitat_byCodeCorindeBiotipe, cache)(habitatId)
)

export const selectCurrentHabitatLayers = createSelector(
  selectCurrentHabitat,
  habitat =>
    habitat &&
    ['A', 'a', 'h'].reduce(
      (o, layer) => ({
        ...o,
        [layer]: habitat.population
          .filter(x => x.layer == layer)
          .reduce((sum, x) => sum + x.representation, 0),
      }),
      {}
    )
)
