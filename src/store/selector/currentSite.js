export const selectCurrentSite = state =>
  (state.router.key === 'site' &&
    state.resource.sites.find(x => x.id === state.router.param.siteId)) ||
  null
