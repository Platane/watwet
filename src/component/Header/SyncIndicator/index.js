import { connect } from 'preact-redux'
import { SyncIndicator as Dumb } from './Dumb'
import { logout } from '~/store/action/auth'
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

  return {
    display: ['habitatList', 'habitat', 'site', 'siteList'].includes(
      state.router.key
    ),
    offline: selectOffline(state),
    path,
    mutated,
    lastSyncDate,
  }
})

export const SyncIndicator = injectState(Dumb)
