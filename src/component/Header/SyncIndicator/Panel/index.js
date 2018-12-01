import { connect } from 'preact-redux'
import {
  selectResourceLastSyncDate,
  selectResourceFetching,
  selectResourceDiff,
  selectResourcePath,
} from '../selector'
import { selectSpreadsheetUrl } from '~/store/selector/spreadsheetUrl'
import { selectOffline } from '~/store/selector/offline'
import {
  forceRefreshSite,
  forceRefreshSites,
} from '~/store/action/onlineStorage'

import { Panel as Dumb } from './Dumb'

const withState = connect(
  state => ({
    offline: selectOffline(state),
    diff: selectResourceDiff(state),
    path: selectResourcePath(state),
    fetching: selectResourceFetching(state),
    spreadsheetUrl: selectSpreadsheetUrl(state),
  }),
  {
    forceRefreshSite,
    forceRefreshSites,
  }
)

export const Panel = withState(Dumb)
