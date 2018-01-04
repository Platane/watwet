import deburr from 'lodash.deburr'
import kebabCase from 'lodash.kebabcase'
import { toPromise, getAllSheets } from '../util'
import {
  getId,
  parse as parseHabitat,
  format as formatHabitat,
} from './parse/habitat'
import {
  parse as parseHabitatList,
  format as formatHabitatList,
} from './parse/habitatList'
import { setSheets } from './setSheets'
import { setInTemplate } from './setInTemplate'
import type { Site } from 'type'

export const list = async () => {
  const gapi = window.gapi

  const res = await gapi.client.drive.files.list({
    q:
      "mimeType='application/vnd.google-apps.spreadsheet' and name contains 'site-'",
    spaces: 'drive',
  })

  return res.result.files
    .filter(x => x.name.slice(0, 5) == 'site-')
    .map(x => ({ id: x.id, name: x.name.slice(5) }))
}

export const get = async (id: string): Site => {
  const gapi = window.gapi

  const site = {
    id,
    name: 'site0',
    description: 'This site is a demo',
    client: 'FBI',
    habitats: [],
  }

  {
    const res = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: 'habitats!A2:E',
    })

    site.habitats = parseHabitatList(res.result.values)
  }

  if (!site.habitats.length) return site

  {
    const res = await getAllSheets(
      id,
      site.habitats.map(h => `${h.info.id}!A6:D`)
    )

    res.result.valueRanges.map(({ values, range }) => {
      const habitat = site.habitats.find(x => range.includes(x.info.id))

      if (!habitat) return

      const { population, layers } = parseHabitat(values)

      habitat.population = population
      habitat.layers = layers
    })
  }

  return site
}

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
