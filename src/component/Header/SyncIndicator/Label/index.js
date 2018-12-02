import { connect } from 'preact-redux'
import {
  selectResourceLastSyncDate,
  selectResourceFetching,
  selectResourceMutated,
  selectResourceKey,
} from '../selector'
import { selectOffline } from '~/store/selector/offline'

import { Label as Dumb } from './Dumb'

const withState = connect(state => ({
  key: selectResourceKey(state),
  offline: selectOffline(state),
  mutated: selectResourceMutated(state),
  fetching: selectResourceFetching(state),
  lastSyncDate: selectResourceLastSyncDate(state),
}))

export const Label = withState(Dumb)
