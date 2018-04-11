import { connect } from 'preact-redux'
import { App as Dumb } from './Dumb'
import { withCssReset } from '~/component/_abstract/cssReset'
import { selectCurrentUser } from '~/store/selector/currentUser'

const injectState = connect(state => ({
  routerKey: state.router.key,
  routerParam: state.router.param,
  anonym: !selectCurrentUser(state),
}))

export const App = withCssReset(injectState(Dumb))
