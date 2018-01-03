import { connect } from 'preact-redux'
import { Header as Dumb } from './Dumb'
import { goTo } from '~/store/action/router'
import { logout } from '~/store/action/auth'
import { selectCurrentUser } from '~/store/selector/currentUser'

const injectState = connect(
  state => ({
    user: selectCurrentUser(state),
  }),
  { logout }
)

export const Header = injectState(Dumb)
