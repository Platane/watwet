import { createSelector } from 'reselect'

export const selectCurrentHabitatId = state => state.router.param.habitatId

export const selectCurrentHabitat = createSelector(
  state => state.resource.mutated,
  state => state.resource.original,
  selectCurrentHabitatId,
  (mutated, original, habitatId) =>
    (habitatId &&
      (mutated[`habitat.${habitatId}`] || original[`habitat.${habitatId}`])) ||
    null
)
