import { connect } from 'preact-redux'
import { App as Dumb } from './Dumb'

const injectState = connect(state => ({
  routerKey: state.router.key,
  routerParam: state.router.param,
}))

export const App = injectState(Dumb)
