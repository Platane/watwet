export const hydrateVegetalDictionary = vegetalDictionary => ({
  type: 'onlineStorage:hydrateVegetalDictionary',
  vegetalDictionary,
})

export const hydrateHabitats = habitats => ({
  type: 'onlineStorage:hydrateHabitats',
  habitats,
})

export const hydrateSites = sites => ({
  type: 'onlineStorage:hydrateSites',
  sites,
})
