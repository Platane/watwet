import { malFormatedError } from '../../../util'
import { toGrid, fillGrid } from '../../grid'
import { parseHabitat } from '../habitat'
import type { Site, Habitat } from 'type'
import type { Grid } from '../../grid'

const parseSiteInfo = (grid: Grid) => {
  fillGrid(1, 2)(grid)

  return {
    name: grid[0][0],
    description: grid[1][0],
  }
}

export const parseSite = async ({ spreadsheetId, sheets }): Site => {
  if (!sheets) throw malFormatedError()

  const infoSheet = sheets.find(x => x.properties.title == 'data_info')

  const habitatSheets = sheets.filter(
    x =>
      x.properties.title.slice(0, 5) === 'data_' &&
      x.properties.title != 'data_info'
  )

  return {
    ...parseSiteInfo(toGrid(infoSheet && infoSheet.data)),
    id: spreadsheetId,
    habitats: habitatSheets.map(x => ({
      ...parseHabitat(toGrid(x.data)),
      siteId: spreadsheetId,
      id: x.properties.sheetId,
    })),
  }
}

export const formatSiteInfo = (site: Site) => {
  const grid = []
  fillGrid(3, 3 + site.habitats.length)(grid)

  grid[0][0] = site.name
  grid[1][0] = site.description

  site.habitats.forEach((habitat, i) => {
    grid[3 + i][0] = habitat.info.codeCorineBiotipe
    grid[3 + i][1] = habitat.info.name
  })

  return grid
}
