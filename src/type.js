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

export type SiteInfo = {
  name: string,
  geoloc: GeolocPoint,
  picture_url: string,
}

export type VegetalPopulation = {
  vegetal: Vegetal,
  representation: number,
}[]

export type Site = {
  id: string,

  info: SiteInfo,

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
