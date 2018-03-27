import { toGrid } from '../../common/grid'
import { toPromise, malFormatedError } from '../../util'
import { parseHabitat } from '../../common/parse/habitat'
import type { Site, Habitat } from 'type'

const parseSiteInfo = () => ({
  name: '',
  description: '',
})

export const get = async (spreadsheetId: string): Promise<Site> => {
  const gapi = window.gapi

  const { result } = await toPromise(
    gapi.client.sheets.spreadsheets.get({
      spreadsheetId,
      includeGridData: true,
    })
  )

  if (!result.sheets || !result.sheets[0]) throw malFormatedError()

  return {
    id: spreadsheetId,
    ...parseSiteInfo(toGrid(result.sheets[0].data)),
    habitats: result.sheets.slice(1).map(x => ({
      ...parseHabitat(toGrid(x.data)),
      id: x.properties.sheetId,
    })),
  }
}
