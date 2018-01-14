import type { Habitat, Site } from 'type'

export type FlatHabitat = Habitat
export type FlatSite = {
  ...Site,

  habitats: string[],
}

export type State = {
  habitats: { [string]: FlatHabitat },
  sites: { [string]: FlatSite },
}
