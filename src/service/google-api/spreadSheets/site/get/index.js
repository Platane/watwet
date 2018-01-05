import { toPromise, getAllSheets } from '../../util'
import { getId, parse as parseHabitat } from '../parse/habitat'
import { parse as parseHabitatList } from '../parse/habitatList'
import type { Site } from 'type'

const toArray = data =>
  data[0].rowData.map(({ values }) =>
    values.map(
      ({ formattedValue, userEnteredValue }) =>
        (userEnteredValue &&
          Object.keys(userEnteredValue).reduce(
            (s, key) => s || userEnteredValue[key],
            ''
          )) ||
        formattedValue
    )
  )

export const get = async (spreadsheetId: string): Site => {
  const gapi = window.gapi

  const { result } = await toPromise(
    gapi.client.sheets.spreadsheets.get({
      spreadsheetId,
      includeGridData: true,
    })
  )

  return {
    id: spreadsheetId,
    habitats: result.sheets.slice(2).map(x => {
      const id = x.properties.title

      const arr = toArray(x.data)

      const info = {
        name: arr[0][0],
        picture_url: ((arr[3][0] || '').match(/IMAGE\("(.*)"\)/) || [])[1],
        codeNatura2000: arr[1][4],
        codeCorineBiotipe: arr[0][4],
        location: arr[4][0],
        description: arr[6][1],
      }

      return { id, info, ...parseHabitat(arr.slice(10)) }
    }),
  }
}
