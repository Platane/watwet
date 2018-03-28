import type { Habitat } from 'type'
import { removeDuplicate } from '~/util/array'

import { vegetals } from './vegetals'

const pickRand = arr => () => arr[Math.floor(Math.random() * arr.length)]

const pickVegetal = pickRand(vegetals)

const pickRepartition = n => {
  const arr = Array.from({ length: n }).map(() => Math.random())
  const sum = arr.reduce((sum, x) => sum + x, 0)
  return arr.map(x => x / sum)
}

export const habitats: Habitat[] = Array.from({ length: 16 }).map((_, i) => ({
  id: `habitat-${i + 1}`,

  info: {
    codeCorineBiotipe: Math.floor(Math.random() * 100000).toString(),
    description: pickVegetal().name_fr,
    location: pickVegetal().name_fr,
    name: pickVegetal().name_la,
    picture_url: 'https://github.com/Platane.png',
  },

  population: removeDuplicate((a, b) => a.vegetal.id == b.vegetal.id)(
    [].concat(
      ...['A', 'a', 'h'].map(layer =>
        pickRepartition(Math.floor(Math.random() * 3 + 4)).map(
          representation => ({ layer, vegetal: pickVegetal(), representation })
        )
      )
    )
  ),
}))
