import { habitatDiff } from '~/service/diff/habitat'
import { createSelector } from 'reselect'
import { selectCurrentHabitatId, selectCurrentHabitat } from '../currentHabitat'
import { getHabitat } from '~/service/normalize'
import {
  selectVegetal_byId,
  selectHabitat_byCodeCorindeBiotipe,
} from '../dictionaries'

export const selectCurrentHabitatDiff = createSelector(
  state => state.resource,
  selectVegetal_byId,
  selectHabitat_byCodeCorindeBiotipe,
  selectCurrentHabitatId,
  selectCurrentHabitat,
  (cache, vegetal_byId, habitat_byCodeCorindeBiotipe, habitatId, b) => {
    if (!habitatId) return []

    const originalCache = { ...cache, mutated: {} }

    const a = getHabitat(
      vegetal_byId,
      habitat_byCodeCorindeBiotipe,
      originalCache
    )(habitatId)

    return (a && b && habitatDiff(a, b)) || []
  }
)
