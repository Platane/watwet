import { connect } from 'preact-redux'
import { SyncIndicator as Dumb } from './Dumb'
import {
  forceRefreshSite,
  forceRefreshSites,
} from '~/store/action/onlineStorage'
import { selectCurrentUser } from '~/store/selector/currentUser'
import { selectCurrentSiteId } from '~/store/selector/currentSite'
import { selectCurrentHabitatId } from '~/store/selector/currentHabitat'
import { selectOffline } from '~/store/selector/offline'

const injectState = connect(state => {
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

  const offline = selectOffline(state)

  const fetching =
    !offline &&
    !!state.resource.shouldFetch[(path[0] && `site.${path[0]}`) || 'sites']

  return {
    display: ['habitatList', 'habitat', 'site', 'siteList'].includes(
      state.router.key
    ),
    path,
    offline,
    mutated,
    fetching,
    lastSyncDate,
  }
})

export const SyncIndicator = injectState(Dumb)
