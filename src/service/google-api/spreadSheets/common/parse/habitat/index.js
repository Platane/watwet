import { malFormatedError } from '../../../util'
import { fillGrid, cutGrid } from '../../grid'
import { parseImage, formatImage } from '../image'
import type { Site, Habitat } from 'type'
import type { Grid } from '../../grid'

export const formatHabitat = (habitat: Habitat): Grid => {
  const h = habitat.population.length + 1

  const grid = []
  fillGrid(18, h)(grid)

  // info
  {
    grid[0][0] = formatImage(habitat.info.picture_url)

    grid[0][1] = habitat.info.name
    grid[1][1] = habitat.info.codeCorine
    grid[2][1] = habitat.info.description
    grid[3][1] = habitat.info.location
  }

  ;[
    { layer: 'A', offsetX: 3 },
    { layer: 'a', offsetX: 8 },
    { layer: 'h', offsetX: 13 },
  ].forEach(({ layer, offsetX }) => {
    grid[0][offsetX] = layer
    grid[0][offsetX + 3] = habitat.layers[layer]

    habitat.population
      .filter(x => x.vegetal.layer === layer)
      .forEach(({ vegetal, representation }, i) => {
        grid[i + 1][offsetX + 0] = vegetal.name_fr
        grid[i + 1][offsetX + 1] = vegetal.name_la
        grid[i + 1][offsetX + 2] = 'humide'
        grid[i + 1][offsetX + 3] = representation
      })
  })

  return grid
}

const parseHabitatList = (arr: Grid) => {
  const layer = arr[0][0]

  if (!layer || !['A', 'a', 'h'].includes(layer)) throw malFormatedError()

  const population = arr
    .slice(1)
    .map(row => {
      if (!(row[0] || row[1]) || !row[3]) return null

      return {
        vegetal: {
          id: row[1],
          layer,
          name_fr: row[0],
          name_la: row[1],
        },
        representation: +row[3],
      }
    })
    .filter(Boolean)

  return {
    population,
    layers: {
      [layer]: +(arr[0][1] || arr[0][2] || arr[0][3] || 0),
    },
  }
}

const parseHabitatInfo = (arr: Grid) => ({
  picture_url: parseImage(arr[0][0]),
  name: arr[0][1],
  codeCorine: arr[1][1],
  description: arr[2][1],
  location: arr[3][1],
})

export const parseHabitat = (arr: Grid): Habitat => {
  fillGrid(12, 3)(arr)

  return [[3, 0, 4, null], [8, 0, 4, null], [13, 0, 4, null]].reduce(
    (habitat, split) => {
      cutGrid(...split)(arr)

      const { layers, population } = parseHabitatList(cutGrid(...split)(arr))

      habitat.layers = { ...habitat.layers, ...layers }
      habitat.population.push(...population)

      return habitat
    },
    {
      info: parseHabitatInfo(arr),
      population: [],
      layers: {
        A: 0,
        a: 0,
        h: 0,
      },
    }
  )
}
