import type { Layer } from '~/type'

export const locationChanged = location => ({
  type: 'location:changed',
  ...location,
})

export const goTo = (path: string, query?: Object) => ({
  type: 'location:goTo',
  query: query || {},
  path,
})

export const selectLayer = (layer: Layer) => ({
  type: 'location:selectLayer',
  layer,
})
