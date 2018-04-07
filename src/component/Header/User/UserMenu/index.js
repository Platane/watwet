import { connect } from 'preact-redux'
import { UserMenu as Dumb } from './Dumb'
import { logout } from '~/store/action/auth'
import { selectCurrentUser } from '~/store/selector/currentUser'
import { selectOffline } from '~/store/selector/offline'

const injectState = connect(
  state => ({
    user: selectCurrentUser(state),
    offline: selectOffline(state),
  }),
  { logout }
)

export const UserMenu = injectState(Dumb)
