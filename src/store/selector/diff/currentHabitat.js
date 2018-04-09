import { habitatDiff } from '~/service/diff/habitat'
import { createSelector } from 'reselect'
import { selectCurrentHabitatId } from '../currentHabitat'
import { getHabitat } from '~/service/normalize'
import { selectVegetal_byId } from '../dictionaries'

export const selectCurrentHabitatDiff = createSelector(
  state => state.resource,
  selectVegetal_byId,
  selectCurrentHabitatId,
  (cache, vegetal_byId, habitatId) => {
    if (!habitatId) return []

    const originalCache = { ...cache, mutated: {} }

    const a = getHabitat(vegetal_byId, originalCache)(habitatId)
    const b = getHabitat(vegetal_byId, cache)(habitatId)

    return habitatDiff(a, b)
  }
)
