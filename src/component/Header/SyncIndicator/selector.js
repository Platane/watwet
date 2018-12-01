import { createSelector } from 'reselect'
import { selectCurrentSiteId } from '~/store/selector/currentSite'
import { selectCurrentHabitatId } from '~/store/selector/currentHabitat'
import { selectCurrentSiteDiff } from '~/store/selector/diff/currentSite'
import { selectCurrentHabitatDiff } from '~/store/selector/diff/currentHabitat'
import { selectSpreadsheetApiReady } from '~/store/selector/spreadsheetApiReady'
import { selectOffline } from '~/store/selector/offline'

/**
 * collection of selector for information about the current resource
 * which can be either a habitat, a site, or the list of sites
 */

export const selectResourcePath = createSelector(
  selectCurrentSiteId,
  selectCurrentHabitatId,
  (site, habitat) => [site, habitat].filter(Boolean)
)

const getResourceKey = path =>
  (path.length == 0 && 'sites') ||
  (path.length == 1 && `site.${path[0]}`) ||
  (path.length == 2 && `habitat.${path[1]}`)

const selectResourceKey = createSelector(
  selectResourcePath,
  getResourceKey
)

export const selectResourceLastSyncDate = createSelector(
  state => state.resource.dateFetched,
  selectResourceKey,
  (dateFetched, key) => dateFetched[key]
)

export const selectResourceMutated = createSelector(
  state => state.resource.mutated,
  selectResourceKey,
  (mutated, key) => mutated[key]
)

export const selectResourceFetching = createSelector(
  selectOffline,
  selectSpreadsheetApiReady,
  state => state.resource.shouldFetch,
  selectResourcePath,
  (offline, apiReady, shouldFetch, path) => {
    if (offline) return false

    if (!apiReady) return false

    const key = getResourceKey(path.slice(0, 1))

    return !!shouldFetch[key]
  }
)

export const selectResourceDiff = createSelector(
  selectResourcePath,
  selectCurrentSiteDiff,
  selectCurrentHabitatDiff,
  (path, siteDiff, habitatDiff) =>
    (path[1] && habitatDiff) || (path[0] && siteDiff) || []
)
