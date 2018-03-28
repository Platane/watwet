import type { Habitat } from 'type'

export type HabitatDiff =
  | {
      type: 'updateInfo',
      property: 'name' | 'description' | 'location' | 'picture_url',
      nextValue: string,
      previousValue: string,
    }
  | {
      type: 'updateVegetalRepresentation',
      vegetalId: string,
      nextValue: number,
      previousValue: number,
    }
  | {
      type: 'addVegetal',
      vegetalId: string,
      representation: number,
    }
  | {
      type: 'removeVegetal',
      vegetalId: string,
    }

export const habitatDiff = (a: Habitat, b: Habitat): HabitatDiff[] => {
  const diff: HabitatDiff[] = []

  // updateInfo
  diff.push(
    ...['name', 'description', 'location', 'picture_url']
      .filter(property => a.info[property] !== b.info[property])
      .map(property => ({
        type: 'updateInfo',
        property,
        nextValue: b.info[property],
        previousValue: a.info[property],
      }))
  )

  // updateVegetalRepresentation
  diff.push(
    ...b.population
      .map(u => {
        const v = a.population.find(v => u.vegetal.id == v.vegetal.id)

        return v && u.representation != v.representation
          ? {
              type: 'updateVegetalRepresentation',
              vegetalId: u.vegetal.id,
              nextValue: u.representation,
              previousValue: v.representation,
            }
          : null
      })
      .filter(Boolean)
  )

  // addVegetal
  diff.push(
    ...b.population
      .filter(u => !a.population.some(v => u.vegetal.id == v.vegetal.id))
      .map(u => ({
        type: 'addVegetal',
        vegetalId: u.vegetal.id,
        representation: u.representation,
      }))
  )

  // removeVegetal
  diff.push(
    ...a.population
      .filter(u => !b.population.some(v => u.vegetal.id == v.vegetal.id))
      .map(u => ({
        type: 'removeVegetal',
        vegetalId: u.vegetal.id,
      }))
  )

  return diff
}
