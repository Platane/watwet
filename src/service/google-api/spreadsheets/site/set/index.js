import deburr from 'lodash.deburr'
import kebabCase from 'lodash.kebabcase'
import { toPromise, getAllSheets } from '../../util'
import { setSheets } from '../../common/setSheets'
import { setCells } from '../../common/setCells'
import { toGrid } from '../../common/grid'
import { formatSiteInfo } from '../../common/parse/site'
import { setFromCurrentSheet as setHabitatFromCurrentSheet } from '../../habitat/set'
import type { Site, Habitat } from 'type'

const emptySheet = sheetId => ({
  properties: { sheetId },
  data: null,
})

const getHabitatSheetTitle = (habitat: Habitat) =>
  'data_' +
  kebabCase(deburr(habitat.info.name)) +
  '_' +
  habitat.id.toString(36).slice(0, 3)

const formatSheets = (site: Site) =>
  [
    // info sheet
    { sheetId: 0, title: 'data_info' },

    // one sheet for
    ...site.habitats.map((habitat, i) => ({
      sheetId: +habitat.id,
      title: getHabitatSheetTitle(habitat),
    })),
  ].map(properties => ({ properties }))

const setInfoFromCurrentSheet = (
  { properties: { sheetId }, data },
  site: Site
) => setCells(sheetId, toGrid(data), formatSiteInfo(site))

const extractNonDataSheet = sheets =>
  sheets.filter(
    x => x.properties.sheetId && x.properties.title.slice(0, 5) !== 'data_'
  )

export const setFromCurrentSheets = (sheets, site: Site) => [
  // sync the sheets
  ...setSheets(sheets, [...formatSheets(site), ...extractNonDataSheet(sheets)]),

  // sync the info sheet
  ...setInfoFromCurrentSheet(
    sheets.find(x => x.properties.sheetId == 0) || emptySheet(0),
    site
  ),

  // sync the sheet for each habitat
  ...[].concat(
    ...site.habitats.map(habitat => {
      const sheet =
        sheets.find(x => x.properties.sheetId == habitat.id) ||
        emptySheet(habitat.id)

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
