export const setSetting = setting => ({
  type: 'setting:set',
  setting,
})

export const resetSetting = () => ({
  type: 'setting:reset',
})

export const forceHabitatDictionaryRefresh = () => ({
  type: 'resource:forceRefetch',
  shouldFetch: ['habitatDictionary'],
})

export const forceVegetalDictionaryRefresh = () => ({
  type: 'resource:forceRefetch',
  shouldFetch: ['vegetalDictionary'],
})
