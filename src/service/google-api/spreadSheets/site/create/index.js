import { toPromise } from '../../util'
import deburr from 'lodash.deburr'
import kebabCase from 'lodash.kebabcase'
import type { Site } from 'type'

export const create = async (title: string): Promise<string> => {
  const gapi = window.gapi

  const { result } = await toPromise(
    gapi.client.sheets.spreadsheets.create({
      properties: { title: `site_${kebabCase(deburr(title.toLowerCase()))}` },
    })
  )

  return result.spreadsheetId
}
