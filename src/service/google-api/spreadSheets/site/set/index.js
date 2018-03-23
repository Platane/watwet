import deburr from 'lodash.deburr'
import kebabCase from 'lodash.kebabcase'
import { toPromise, getAllSheets } from '../../util'
import { formatHabitat } from '../parse/habitat'
// import { format as formatHabitatList } from '../parse/habitatList'
import { setSheets } from './setSheets'
import type { Site } from 'type'

export const set = async (site: Site) => {
  const gapi = window.gapi

  const sheets_title = [
    'info',
    'habitats',
    ...site.habitats.map((habitat, i) => getId(i, habitat.info.name)),
  ]

  // sync the sheets
  {
    const res = await gapi.client.sheets.spreadsheets.get({
      spreadsheetId: site.id,
      responseIncludeGridData: true,
    })

    const requests = setSheets(res.result.sheets, sheets_title)

    if (requests.length)
      await gapi.client.sheets.spreadsheets.batchUpdate({
        spreadsheetId: site.id,
        requests,
      })
  }

  const ranges = sheets_title.map(title => `${title}!A1:E`)

  // sync the sheet inside
  {
    const res = await gapi.client.sheets.spreadsheets.get({
      spreadsheetId: site.id,
      includeGridData: true,
      ranges,
    })

    const set = await setInTemplate()

    const requests = [].concat(
      ...site.habitats.map((habitat, i) => {
        const title = getId(i, habitat.info.name)

        const sheet = res.result.sheets.find(x => x.properties.title == title)

        return set(sheet, habitat)
      })
    )

    if (requests.length)
      await gapi.client.sheets.spreadsheets.batchUpdate({
        spreadsheetId: site.id,
        requests,
      })
  }
}
