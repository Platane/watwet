import { createSelector } from 'reselect'
import { selectCurrentSiteId } from './currentSite'
import { selectCurrentHabitatId } from './currentHabitat'

export const selectSpreadsheetUrl = createSelector(
  selectCurrentSiteId,
  selectCurrentHabitatId,
  (siteId, habitatId) => {
    if (!siteId) return 'https://docs.google.com/spreadsheets/u/0/?q=site'

    return `https://docs.google.com/spreadsheets/d/${siteId}#gid=${habitatId ||
      0}`
  }
)
