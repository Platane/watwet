import type { Site } from 'type'
import { removeDuplicateId } from '~/util/array'
import { habitats } from './habitats'
import { vegetals } from './vegetals'

const pickRand = arr => () => arr[Math.floor(Math.random() * arr.length)]

const pickHabitat = pickRand(habitats)
const pickVegetal = pickRand(vegetals)

export const sites: Site[] = Array.from({ length: 16 }).map((_, i) => ({
  id: `site-${i + 1}`,

  description: pickVegetal().name_fr,
  client: pickVegetal().name_la,
  name: pickVegetal().name_la,

  habitats: removeDuplicateId(Array.from({ length: 4 }, pickHabitat)),
}))
