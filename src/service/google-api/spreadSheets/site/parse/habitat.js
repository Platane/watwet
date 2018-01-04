import deburr from 'lodash.deburr'
import kebabCase from 'lodash.kebabcase'
import type { Habitat, Vegetal } from 'type'

const layers_names = [
  { key: 'A', name: 'Arborée' },
  { key: 'a', name: 'Arbustive' },
  { key: 'h', name: 'Herbacée' },
].map(x => ({ ...x, normalizedName: deburr(x.name.toLowerCase()) }))

const state_rg = new RegExp(
  `strate .*(${layers_names.map(x => x.normalizedName).join('|')})`
)

const extractSeparator = ([x, r]) => {
  const m = deburr(x.toLowerCase()).match(state_rg)

  if (!m) return null

  return {
    layer: layers_names.find(x => x.normalizedName == m[1]).key,
    representation: r / 100,
  }
}

const extractVegetal = layer => ([name_fr, name_la, id, r]): {
  vegetal: Vegetal,
  representation: number,
} => {
  const representation = parseInt(((r || '').match(/\d+/) || [0])[0], 10)

  return {
    vegetal: { id, layer, name_fr, name_la },
    representation,
  }
}

export const getId = (i: number, name: string) => {
  const normalizedName = kebabCase(deburr(name.toLowerCase()))

  return `${i + 1}_${normalizedName.slice(0, 12)}`
}

export const parse = (values: string[][]): Habitat => {
  const population = []
  const layers = {}
  layers_names.forEach(x => (layers[x.key] = 0))

  let layer = null

  values.forEach(x => {
    const s = extractSeparator(x)

    if (s) {
      layer = s.layer
      layers[s.layer] = s.representation
    } else {
      population.push(extractVegetal(layer)(x))
    }
  })

  return {
    population,
    layers,
  }
}

export const format = (habitat: Habitat): string[][] =>
  [].concat(
    ...layers_names
      .filter(a => habitat.layers[a.key] > 0)
      .sort((a, b) => (habitat.layers[a.key] < habitat.layers[b.key] ? 1 : -1))
      .map(({ key, name }) => [
        [`strate ${name}`, habitat.layers[key], '', '', ''],

        ...habitat.population
          .filter(x => x.vegetal.layer === key)
          .sort((a, b) => (a.representation < b.representation ? 1 : -1))
          .map(({ vegetal, representation }, i, arr) => [
            vegetal.name_fr,
            vegetal.name_la,
            representation,
            arr.slice(0, i + 1).reduce((sum, x) => sum + x.representation, 0),
            '',
          ]),
      ])
  )
