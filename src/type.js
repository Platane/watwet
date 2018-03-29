// Arborée
// arbustive
// herbacée
export type Layer = 'A' | 'a' | 'h'

export type Vegetal = {
  id: string,

  wet: boolean,

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
  codeCorineBiotipe: string,
  picture_url: string,
  // geoloc: GeolocPoint,
}

export type Habitat = {
  id: string,
  siteId: string,

  info: HabitatInfo,

  population: {
    layer: Layer,
    vegetal: Vegetal,
    representation: number,
  }[],
}

export type Site = {
  id: string,

  name: string,
  description: string,

  // client: string,

  habitats: Habitat[],
}

export type User = {
  id: string,
  name: string,
  picture_url: string,
}
