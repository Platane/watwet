import deburr from 'lodash.deburr'
import kebabCase from 'lodash.kebabcase'
import { toPromise, getAllSheets } from '../../util'
import { setSheets } from '../../common/setSheets'
import { setFromCurrentSheet as setHabitatFromCurrentSheet } from '../../habitat/set'
import type { Site } from 'type'

const formatSheets = (site: Site) =>
  [
    { sheetId: 0, title: 'data_info' },
    ...site.habitats.map((habitat, i) => ({
      sheetId: +habitat.id,

      title: `data_${kebabCase(deburr(habitat.info.name))}_${habitat.id}`,
    })),
  ].map((x, index) => ({ properties: { index, ...x } }))

export const setFromCurrentSheets = (sheets, site: Site) => [
  ...setSheets(sheets, formatSheets(site)),

  ...[].concat(
    ...site.habitats.map(habitat => {
      const sheet = sheets.find(x => x.sheetId == habitat.id) || {
        properties: { sheetId: habitat.id },
        data: null,
      }

      return setHabitatFromCurrentSheet(sheet, habitat)
    })
  ),
]

export const set = async (site: Site) => {
  const gapi = window.gapi

  const spreadsheetId = site.id

  const { result } = await toPromise(
    gapi.client.sheets.spreadsheets.get({
      spreadsheetId,
      includeGridData: true,
    })
  )

  const requests = setFromCurrentSheets(result.sheets, site)

  if (requests.length)
    await gapi.client.sheets.spreadsheets.batchUpdate({
      // responseIncludeGridData: true,
      spreadsheetId,
      requests,
    })
}
