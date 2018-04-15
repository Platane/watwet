import { createSelector } from 'reselect'
import { normalize } from '~/util/textSearch'

const formatIndex = code => {
  const [a, ...b] = code.toString().split('.')

  return [
    '0'.repeat(10 - a.length) + a,
    ...Array.from({ length: 1 }).map((_, i) => {
      const u = b[i] || ''

      return u + '0'.repeat(10 - u.length)
    }),
  ].join('')
}

const formatCodeCorineBiotipe = code => code

export const selectHabitatDictionary = createSelector(
  state => state.resource.original.habitatDictionary,
  habitatDictionary =>
    (habitatDictionary || [])
      .map(x => ({
        ...x,
        id: formatIndex(x.codeCorineBiotipe),
        codeCorineBiotipe: formatCodeCorineBiotipe(x.codeCorineBiotipe),
        name: x.canonicalName,
        normalizedName: normalize(x.canonicalName),
      }))
      .sort((a, b) => (a.id < b.id ? -1 : 1))
)

export const selectVegetalDictionary = createSelector(
  state => state.resource.original.vegetalDictionary,
  (vegetalDictionary = []) =>
    vegetalDictionary.map(x => ({
      ...x,
      name_fr_normalized: normalize(x.name_fr),
      name_la_normalized: normalize(x.name_la),
    }))
)

export const selectVegetal_byId = createSelector(
  selectVegetalDictionary,
  (arr = []) => {
    const byId = {}
    arr.forEach(x => (byId[x.id] = x))
    return byId
  }
)

export const selectHabitat_byCodeCorindeBiotipe = createSelector(
  state => state.resource.original.habitatDictionary,
  (arr = []) => {
    const byCodeCorineBiotipe = {}
    arr.forEach(x => (byCodeCorineBiotipe[x.codeCorineBiotipe] = x))
    return byCodeCorineBiotipe
  }
)

export const selectDitionariesReady = createSelector(
  selectVegetalDictionary,
  selectHabitatDictionary,
  (a, b) => !!(a && a.length && b && b.length)
)
