export const hydrateVegetalDictionary = vegetalDictionary => ({
  type: 'onlineStorage:hydrateVegetalDictionary',
  vegetalDictionary,
})

export const hydrateSites = sites => ({
  type: 'onlineStorage:hydrateSites',
  sites,
})
