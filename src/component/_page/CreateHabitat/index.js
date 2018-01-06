import { connect } from 'preact-redux'
import { CreateHabitat as Dumb } from './Dumb'
import { goTo } from '~/store/action/router'
import { logout } from '~/store/action/auth'
import { selectCurrentUser } from '~/store/selector/currentUser'
import withState from './hoc.state'

const injectState = connect(
  state => ({
    user: selectCurrentUser(state),
  }),
  { logout }
)

export const CreateHabitat = withState(injectState(Dumb))
