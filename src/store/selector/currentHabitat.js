export const selectCurrentHabitat = state =>
  (state.router.key === 'habitat' &&
    state.resource.habitats.find(x => x.id === state.router.param.habitatId)) ||
  null
