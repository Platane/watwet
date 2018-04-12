import { connect } from 'preact-redux'
import {
  forceRefreshSite,
  forceRefreshSites,
} from '~/store/action/onlineStorage'
import { selectCurrentUser } from '~/store/selector/currentUser'
import { selectCurrentSiteId } from '~/store/selector/currentSite'
import { selectCurrentHabitatId } from '~/store/selector/currentHabitat'
import { selectCurrentSiteDiff } from '~/store/selector/diff/currentSite'
import { selectCurrentHabitatDiff } from '~/store/selector/diff/currentHabitat'
import { selectSpreadsheetApiReady } from '~/store/selector/spreadsheetApiReady'
import { selectSpreadsheetUrl } from '~/store/selector/spreadsheetUrl'
import { selectOffline } from '~/store/selector/offline'

export const withState = connect(
  state => {
    const path = [
      selectCurrentSiteId(state),
      selectCurrentHabitatId(state),
    ].filter(Boolean)

    const currentKey =
      (path.length == 0 && 'sites') ||
      (path.length == 1 && `site.${path[0]}`) ||
      (path.length == 2 && `habitat.${path[1]}`)

    const lastSyncDate = state.resource.dateFetched[currentKey]

    const mutated = state.resource.mutated[currentKey]

    const offline = selectOffline(state) || !selectSpreadsheetApiReady(state)

    const fetching =
      !offline &&
      !!state.resource.shouldFetch[(path[0] && `site.${path[0]}`) || 'sites']

    const diff =
      (path[1] && selectCurrentHabitatDiff(state)) ||
      (path[0] && selectCurrentSiteDiff(state)) ||
      []

    return {
      display: [
        'habitatList',
        'habitat',
        'habitatEdit',
        'site',
        'siteList',
      ].includes(state.router.key),
      path,
      diff,
      offline,
      mutated,
      fetching,
      lastSyncDate,
      spreadsheetUrl: selectSpreadsheetUrl(state),
    }
  },
  {
    forceRefreshSite,
    forceRefreshSites,
  }
)
