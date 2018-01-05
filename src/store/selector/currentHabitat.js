import { createSelector } from 'reselect'
import { habitats } from './primitive'

const habitatId = state => state.router.param.habitatId

export const selectCurrentHabitat = createSelector(
  habitats,
  habitatId,
  (habitats, habitatId) => habitats[habitatId] || null
)
