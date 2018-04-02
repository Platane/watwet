import type { Vegetal } from 'type'

export const get = async (spreadsheetId: string): Promise<Vegetal[]> => {
  const gapi = window.gapi

  const res = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A2:D',
  })

  return res.result.values.map(x => ({
    id: x[0],
    wet: x[1].toLowerCase().trim() === 'true',
    name_fr: x[2],
    name_la: x[3],
  }))
}
