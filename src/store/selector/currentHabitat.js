import { createSelector } from 'reselect'
import { getHabitat } from '~/service/normalize'
import { selectVegetal_byId } from './dictionaries'

export const selectCurrentHabitatId = state => state.router.param.habitatId

export const selectCurrentHabitat = createSelector(
  state => state.resource,
  selectVegetal_byId,
  selectCurrentHabitatId,
  (cache, vegetal_byId, habitatId) => getHabitat(vegetal_byId, cache)(habitatId)
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
