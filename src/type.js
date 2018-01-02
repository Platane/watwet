// herbacée
export type Level = 'A' | 'a' | 'h'

export type Vegetal = {
  id: string,

  level: Level,

  name_fr: string,
  name_la: string,

  isWet: boolean,
}

export type GeolocPoint = {
  lat: number,
  lng: number,
}

export type HabitatInfo = {
  name: string,
  description: string,
  geoloc: GeolocPoint,
  picture_url: string,
}

export type VegetalPopulation = {
  vegetal: Vegetal,
  representation: number,
}[]

export type Habitat = {
  id: string,

  info: HabitatInfo,

  levels: {
    A: {
      population: VegetalPopulation,
      representation: number,
    },
    a: {
      population: VegetalPopulation,
      representation: number,
    },
    h: {
      population: VegetalPopulation,
      representation: number,
    },
  },
}

export type Site = {
  id: string,

  name: string,
  description: string,

  client: string,

  habitats: Habitat[],
}
