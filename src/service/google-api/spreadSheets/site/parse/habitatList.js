import { getId } from './habitat'
import type { Site } from 'type'

export const parse = (values: string[][]): Site =>
  values.map((x, i) => {
    const [_, name, codeCorineBiotipe, codeNatura2000] = x

    const id = getId(i, name)

    return {
      id,
      info: { name, codeCorineBiotipe, codeNatura2000 },
      population: [],
      layers: { A: 0, a: 0, h: 0 },
    }
  })

export const format = (site: Site): string[][] =>
  site.habitats.map((x, i) => {
    const id = getId(i, x.info.name)

    return [i + 1, x.info.name, x.info.codeCorineBiotipe, x.info.codeNatura2000]
  })
