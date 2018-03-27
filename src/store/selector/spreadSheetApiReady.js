export const selectSpreadSheetApiReady = state =>
  state.init.network && !state.offline && state.auth.connected
