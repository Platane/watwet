import { parseHabitat, formatHabitat } from '../index'
import { habitats } from '~/__fixtures__/habitats'

it('format / parse should be idempotent', () => {
  const i = habitats[0]
  const o = parseHabitat(formatHabitat(i))

  expect(
    ['A', 'a', 'h'].every(key => Math.abs(i.layers[key] - o.layers[key]) < 0.01)
  ).toBe(true)

  i.population.every(a => {
    const b = o.population.find(b => b.vegetal.name_la == a.vegetal.name_la)

    // expect(b.vegetal).toEqual(a.vegetal)
    expect(Math.abs(b.representation - a.representation) < 0.01).toBe(true)
  })
})
