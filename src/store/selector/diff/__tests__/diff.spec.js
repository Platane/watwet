import { siteDiff } from '../index'
import { sites, habitats, vegetals } from '~/__fixtures__'
import type { Site } from 'type'

it('should extract diff from site', () => {
  const a: Site = sites[0]
  const b: Site = { ...a, name: 'site-b', habitats: a.habitats.slice() }

  // remove one
  b.habitats.splice(1, 1)

  // add one
  b.habitats.push({ ...habitats[0], id: 'h0' })

  // modify one
  b.habitats[0] = {
    ...b.habitats[0],
    info: { ...b.habitats[0].info, name: 'nooo' },
  }

  // modify one
  b.habitats[1] = {
    ...b.habitats[1],
    population: b.habitats[1].population.slice(),
  }

  b.habitats[1].population.shift()

  b.habitats[1].population.push({
    vegetal: { ...vegetals[0], id: 'v0' },
    representation: 0.4,
  })

  b.habitats[1].population[0] = {
    ...b.habitats[1].population[0],
    representation: 0.4,
  }

  // modify one
  b.habitats[2] = {
    ...b.habitats[2],
    layers: { ...b.habitats[2].layers, A: 0.4 },
  }

  const diff = siteDiff(a, b)

  expect(
    [
      'updateInfo',
      'updateLayer',
      'updateVegetalRepresentation',
      'addVegetal',
      'removeVegetal',
      'updateInfo',
      'updateHabitat',
      'addHabitat',
      'removeHabitat',
    ].filter(type => !JSON.stringify(diff).includes(type))
  ).toEqual([])
})
