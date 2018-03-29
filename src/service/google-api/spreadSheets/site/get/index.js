import { toGrid } from '../../common/grid'
import { toPromise, malFormatedError } from '../../util'
import { parseSite } from '../../common/parse/site'
import type { Site, Habitat } from 'type'

export const get = async (spreadsheetId: string): Promise<Site> => {
  const gapi = window.gapi

  const { result } = await toPromise(
    gapi.client.sheets.spreadsheets.get({
      spreadsheetId,
      includeGridData: true,
    })
  )

  return parseSite(result)
}
