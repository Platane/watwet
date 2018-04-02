export const get = async (spreadsheetId: string) => {
  const gapi = window.gapi

  const res = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'A2:C',
  })

  return res.result.values.map(x => ({
    codeCorineBiotipe: x[0],
    canonicalName: x[1],
    isWet: x[2][0] === 'H',
  }))
}
