// Arborée
// arbustive
// herbacée
export type Layer = 'A' | 'a' | 'h'

export type Vegetal = {
  id: string,

  layer: Layer,

  name_fr: string,
  name_la: string,
}

export type GeolocPoint = {
  lat: number,
  lng: number,
}

export type HabitatInfo = {
  name: string,
  description: string,
  location: string,
  // geoloc: GeolocPoint,
  picture_url: string,
}

export type Habitat = {
  id: string,

  info: HabitatInfo,

  population: {
    vegetal: Vegetal,
    representation: number,
  }[],

  layers: {
    [Layer]: number,
  },
}

export type Site = {
  id: string,

  name: string,
  description: string,

  client: string,

  habitats: Habitat[],
}

export type User = {
  id: string,
  name: string,
  picture_url: string,
}
