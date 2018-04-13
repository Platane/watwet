export const get = async (spreadsheetId: string) => {
  const gapi = window.gapi

  const res = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'A2:D',
  })

  return res.result.values.map(x => ({
    codeCorineBiotipe: x[0],
    codeEunis: x[3],
    canonicalName: x[1],
    wet: x[2].toLowerCase() === 'h' || x[2].toLowerCase() === 'true',
  }))
}
