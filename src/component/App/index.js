import { connect } from 'preact-redux'
import { App as Dumb } from './Dumb'
import { withCssReset } from '~/component/_abstract/cssReset'

const injectState = connect(state => ({
  routerKey: state.router.key,
  routerParam: state.router.param,
  anonym: !state.auth.user,
}))

export const App = withCssReset(injectState(Dumb))
