import { createSelector } from 'reselect'
import { selectCurrentSite } from './currentSite'

export const siteId = createSelector(
  selectCurrentSite,
  site => (site && site.id) || null
)

const habitatId = state => state.router.param.habitatId

export const selectSpreadSheetUrl = createSelector(
  habitatId,
  siteId,
  (habitatId, siteId) => {
    if (!siteId) return 'https://docs.google.com/spreadsheets/u/0/?q=site_'

    return `https://docs.google.com/spreadsheets/d/${siteId}#gid=${habitatId ||
      0}`
  }
)
