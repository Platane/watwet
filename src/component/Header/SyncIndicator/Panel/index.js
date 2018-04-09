import { connect } from 'preact-redux'
import { Panel as Dumb } from './Dumb'
import {
  forceRefreshSite,
  forceRefreshSites,
} from '~/store/action/onlineStorage'
import { selectCurrentUser } from '~/store/selector/currentUser'
import { selectCurrentSiteId } from '~/store/selector/currentSite'
import { selectCurrentHabitatId } from '~/store/selector/currentHabitat'
import { selectCurrentSiteDiff } from '~/store/selector/diff/currentSite'
import { selectCurrentHabitatDiff } from '~/store/selector/diff/currentHabitat'
import { selectOffline } from '~/store/selector/offline'

const injectState = connect(
  state => {
    const path = [
      selectCurrentSiteId(state),
      selectCurrentHabitatId(state),
    ].filter(Boolean)

    const currentKey =
      (path.length == 0 && 'sites') ||
      (path.length == 1 && `site.${path[0]}`) ||
      (path.length == 2 && `habitat.${path[1]}`)

    const mutated = state.resource.mutated[currentKey]

    const offline = selectOffline(state)

    const fetching =
      !offline &&
      !!state.resource.shouldFetch[(path[0] && `site.${path[0]}`) || 'sites']

    return {
      path,
      mutated,
      offline,
      fetching,
      diff:
        (path[1] && selectCurrentHabitatDiff(state)) ||
        (path[0] && selectCurrentSiteDiff(state)) ||
        [],
    }
  },
  {
    forceRefreshSite,
    forceRefreshSites,
  }
)

export const Panel = injectState(Dumb)
