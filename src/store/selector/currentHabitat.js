import { createSelector } from 'reselect'

const habitatId = state => state.router.param.habitatId

export const selectCurrentHabitat = createSelector(
  state => state.resource.mutated,
  state => state.resource.original,
  habitatId,
  (mutated, original, habitatId) =>
    (habitatId &&
      (mutated[`habitat.${habitatId}`] || original[`habitat.${habitatId}`])) ||
    null
)
