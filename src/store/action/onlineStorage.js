export const hydrateVegetalDictionary = vegetalDictionary => ({
  type: 'onlineStorage:hydrateVegetalDictionary',
  vegetalDictionary,
})

export const hydrateHabitats = habitats => ({
  type: 'onlineStorage:hydrateHabitats',
  habitats,
})

export const hydrateHabitatCanonicalNames = habitatCanonicalNames => ({
  type: 'onlineStorage:hydrateHabitatCanonicalNames',
  habitatCanonicalNames,
})

export const hydrateSites = sites => ({
  type: 'onlineStorage:hydrateSites',
  sites,
})

export const hydrate = payload => ({
  type: 'resource:online:read',
  ...payload,
})
