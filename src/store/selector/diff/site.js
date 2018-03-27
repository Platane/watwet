import type { Layer, Habitat, Site } from 'type'
import type { HabitatDiff } from './habitat'
import { habitatDiff } from './habitat'

export type SiteDiff =
  | {
      type: 'updateInfo',
      property: 'name' | 'description',
      nextValue: string,
      previousValue: string,
    }
  | {
      type: 'updateHabitat',
      habitatId: string,
      diff: HabitatDiff[],
    }
  | {
      type: 'addHabitat',
      habitatId: string,
    }
  | {
      type: 'removeHabitat',
      habitatId: string,
    }

export const siteDiff = (a: Site, b: Site): SiteDiff[] => {
  const diff: SiteDiff[] = []

  // updateInfo
  diff.push(
    ...['name', 'description']
      .filter(property => a[property] !== b[property])
      .map(property => ({
        type: 'updateInfo',
        property,
        nextValue: b[property],
        previousValue: a[property],
      }))
  )

  // updateHabitat
  diff.push(
    ...b.habitats
      .map(u => {
        const v = a.habitats.find(v => u.id == v.id)

        const diff = v && habitatDiff(v, u)

        return diff && diff.length > 0
          ? {
              type: 'updateHabitat',
              habitatId: u.id,
              diff,
            }
          : null
      })
      .filter(Boolean)
  )

  // addHabitat
  diff.push(
    ...b.habitats.filter(u => !a.habitats.some(v => u.id == v.id)).map(u => ({
      type: 'addHabitat',
      habitatId: u.id,
    }))
  )

  // removeHabitat
  diff.push(
    ...a.habitats.filter(u => !b.habitats.some(v => u.id == v.id)).map(u => ({
      type: 'removeHabitat',
      habitatId: u.id,
    }))
  )

  return diff
}
