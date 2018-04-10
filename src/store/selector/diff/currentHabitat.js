import { habitatDiff } from '~/service/diff/habitat'
import { createSelector } from 'reselect'
import { selectCurrentHabitatId, selectCurrentHabitat } from '../currentHabitat'
import { getHabitat } from '~/service/normalize'
import { selectVegetal_byId } from '../dictionaries'

export const selectCurrentHabitatDiff = createSelector(
  state => state.resource,
  selectVegetal_byId,
  selectCurrentHabitatId,
  selectCurrentHabitat,
  (cache, vegetal_byId, habitatId, b) => {
    if (!habitatId) return []

    const originalCache = { ...cache, mutated: {} }

    const a = getHabitat(vegetal_byId, originalCache)(habitatId)

    return (a && b && habitatDiff(a, b)) || []
  }
)
