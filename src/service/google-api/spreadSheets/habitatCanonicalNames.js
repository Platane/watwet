import { HABITAT_NAME_ID } from '~/config'

export const get = async () => {
  const gapi = window.gapi

  const res = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: HABITAT_NAME_ID,
    range: 'A2:C',
  })

  return res.result.values.map(x => ({
    codeCorineBiotipe: x[0],
    canonicalName: x[1],
    isWet: x[2][0] === 'H',
  }))
}
