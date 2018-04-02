export const setSetting = setting => ({
  type: 'setting:set',
  setting,
})

export const resetSetting = () => ({
  type: 'setting:reset',
})

export const forceHabitatDictionaryRefresh = () => ({
  type: 'setting:forceRefresh:habitatDictionary',
})

export const forceVegetalDictionaryRefresh = () => ({
  type: 'setting:forceRefresh:vegetalDictionary',
})
