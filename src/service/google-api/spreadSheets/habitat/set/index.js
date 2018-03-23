import deburr from 'lodash.deburr'
import kebabCase from 'lodash.kebabcase'
import { toPromise } from '../../util'
import { formatHabitat } from '../../common/parse/habitat'
import { setCells } from '../../common/setCells'
import { toGrid } from '../../common/grid'
import type { Habitat } from 'type'
import type { Grid } from '../../common/grid'

export const setFromCurrentSheet = (
  { properties: { sheetId }, data },
  habitat: Habitat
) => setCells(sheetId, toGrid(data), formatHabitat(habitat))

export const set = async (
  spreadsheetId: string,
  sheetId: string,
  habitat: Habitat
) => {
  const res = await gapi.client.sheets.spreadsheets.get({
    spreadsheetId,
    includeGridData: true,
  })

  const sheet = res.result.sheets.find(x => x.properties.sheetId === sheetId)

  const requests = setFromCurrentSheet(sheet, habitat)

  await gapi.client.sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    responseIncludeGridData: true,
    requests,
  })
}
