import { malFormatedError } from '../../../util'
import { toGrid } from '../../grid'
import { parseHabitat } from '../habitat'
import type { Site, Habitat } from 'type'
import type { Grid } from '../../grid'

const parseSiteInfo = () => ({
  name: '',
  description: '',
})

export const parseSite = async ({ spreadsheetId, sheets }): Site => {
  if (!sheets || !sheets[0]) throw malFormatedError()

  return {
    ...parseSiteInfo(toGrid(sheets[0].data)),
    id: spreadsheetId,
    habitats: sheets.slice(1).map(x => ({
      ...parseHabitat(toGrid(x.data)),
      siteId: spreadsheetId,
      id: x.properties.sheetId,
    })),
  }
}

export const formatSiteInfo = (site: Site) => {
  return []
}
