export const selectSpreadsheetApiReady = state =>
  state.init.network && !state.offline && state.auth.connected
