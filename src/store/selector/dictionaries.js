import { createSelector } from 'reselect'
import { normalize } from '~/util/textSearch'

const habitatCanonicalNames = state => state.resource.habitatCanonicalNames

const formatIndex = code => {
  const [a, ...b] = code.toString().split('.')

  return [
    '0'.repeat(5 - a.length) + a,
    ...Array.from({ length: 1 }).map((_, i) => {
      const u = b[i] || ''

      return u + '0'.repeat(5 - u.length)
    }),
  ].join('')
}

const formatCodeCorineBiotipe = code => code

export const selectHabitatNameDictionary = createSelector(
  habitatCanonicalNames,
  habitatCanonicalNames =>
    habitatCanonicalNames
      .map(x => ({
        ...x,
        id: formatIndex(x.codeCorineBiotipe),
        codeCorineBiotipe: formatCodeCorineBiotipe(x.codeCorineBiotipe),
        name: x.canonicalName,
        normalizedName: normalize(x.canonicalName),
      }))
      .sort((a, b) => (a.id < b.id ? -1 : 1))
)
