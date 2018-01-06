import { VEGETAL_DICTIONARY_ID } from '~/config'
import type { Vegetal } from 'type'

export const get = async (): Promise<Vegetal[]> => {
  const gapi = window.gapi

  const res = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: VEGETAL_DICTIONARY_ID,
    range: 'Sheet1!A2:B',
  })

  return res.result.values.map(x => ({
    id: x[1],
    name_fr: x[0],
    name_la: x[1],
  }))
}
