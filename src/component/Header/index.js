import { connect } from 'preact-redux'
import { Header as Dumb } from './Dumb'
import { goTo } from '~/store/action/router'
import { selectCurrentUser } from '~/store/selector/currentUser'

const injectState = connect(state => ({
  user: selectCurrentUser(state),
}))

export const Header = injectState(Dumb)
