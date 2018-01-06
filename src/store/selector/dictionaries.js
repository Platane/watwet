import { createSelector } from 'reselect'
import { normalize } from '~/util/textSearch'

const habitatCanonicalNames = state => state.resource.habitatCanonicalNames

export const selectHabitatNameDictionary = createSelector(
  habitatCanonicalNames,
  habitatCanonicalNames =>
    habitatCanonicalNames.map(x => ({
      ...x,
      id: '' + x.codeCorineBiotipe,
      name: x.canonicalName,
      normalizedName: normalize(x.canonicalName),
    }))
)
