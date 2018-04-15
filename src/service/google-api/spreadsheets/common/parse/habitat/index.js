import { malFormatedError } from '../../../util'
import { fillGrid, cutGrid } from '../../grid'
import { parseImage, formatImage } from '../image'
import type { Site, Habitat } from 'type'
import type { Grid } from '../../grid'

export const formatHabitat = (habitat: Habitat): Grid => {
  const h = Math.max(habitat.population.length + 1, 6)

  const grid = []
  fillGrid(21, h)(grid)

  // info
  {
    grid[0][0] = formatImage(habitat.info.picture_url)

    grid[0][1] = habitat.info.name
    grid[1][1] = habitat.info.codeCorineBiotipe
    grid[2][1] = habitat.info.description
    grid[3][1] = habitat.info.location
    grid[4][1] = habitat.info.codeEunis
    grid[5][1] = habitat.info.naturalWet
      ? "humide d'après code corine"
      : 'non humide d`après code corine'
  }

  ;['A', 'a', 'h'].forEach((layer, i) => {
    const offsetX = 3 + i * 6

    grid[0][offsetX] = layer
    grid[0][offsetX + 4] = habitat.population
      .filter(x => x.layer === layer)
      .reduce((sum, x) => sum + x.representation, 0)

    habitat.population
      .filter(x => x.layer === layer)
      .forEach(({ vegetal, representation }, i) => {
        grid[i + 1][offsetX + 0] = vegetal.id
        grid[i + 1][offsetX + 1] = vegetal.name_fr
        grid[i + 1][offsetX + 2] = vegetal.name_la
        grid[i + 1][offsetX + 3] = vegetal.wet ? 'h' : ''
        grid[i + 1][offsetX + 4] = representation
      })
  })

  return grid
}

const parseHabitatPopulation = (arr: Grid) => {
  const layer = arr[0][0]

  if (typeof layer != 'string' || !['A', 'a', 'h'].includes(layer))
    throw malFormatedError()

  return arr
    .slice(1)
    .map(row => {
      if (!row[0] || !row[4]) return null

      return {
        layer,
        vegetal: {
          id: row[0],
          name_fr: row[1],
          name_la: row[2],
          wet: !!row[3],
        },
        vegetalId: row[0],
        representation: +row[4],
      }
    })
    .filter(Boolean)
}

const parseHabitatInfo = (arr: Grid) => ({
  picture_url: parseImage(arr[0][0]),
  name: arr[0][1],
  codeCorineBiotipe: arr[1][1],
  description: arr[2][1],
  location: arr[3][1],
})

export const parseHabitat = (arr: Grid): Habitat => {
  fillGrid(21, 4)(arr)

  return Array.from({ length: 3 }).reduce(
    (habitat, _, i) => {
      const subGrid = [3 + i * 6, 0, 5, null]

      const population = parseHabitatPopulation(cutGrid(...subGrid)(arr))

      habitat.population.push(...population)

      return habitat
    },
    {
      info: parseHabitatInfo(arr),
      population: [],
    }
  )
}
