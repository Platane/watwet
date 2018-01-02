import type { Habitat } from 'type'

import { vegetals } from './vegetals'

const pickRand = arr => () => arr[Math.floor(Math.random() * arr.length)]

const pickVegetal = pickRand(vegetals)

const pickRepartition = n => {
  const arr = Array.from({ length: n }).map(() => Math.random())
  const sum = arr.reduce((sum, x) => sum + x, 0)
  return arr.map(x => x / sum)
}

const level = () => ({
  representation: Math.random(),
  population: pickRepartition(Math.floor(Math.random() * 3 + 1)).map(
    representation => ({ vegetal: pickVegetal(), representation })
  ),
})

export const habitats: Habitat[] = Array.from({ length: 16 }).map((_, i) => ({
  id: `habitat-${i + 1}`,

  info: {
    description: pickVegetal().name_fr,
    name: pickVegetal().name_la,
    picture_url: '',
    geoloc: {
      lat: 0,
      lng: 0,
    },
  },

  levels: {
    A: level(),
    a: level(),
    h: level(),
  },
}))
