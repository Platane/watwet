import type { Habitat, Site } from 'type'

export type FlatHabitat = Habitat
export type FlatSite = {
  ...Site,

  habitats: string[],
}

export type State = {
  mutated: Object,
  original: Object,
  dateFetched: { [string]: number },
  dateMutated: { [string]: number },
  mutationKey: { [string]: string },
  shouldFetch: { [string]: string },
}
