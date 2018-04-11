import { connect } from 'preact-redux'
import { ToastZone as Dumb } from './Dumb'
import withState from './withState'

const injectState = connect(({ error }) => ({
  notification: error,
}))

export const ToastZone = injectState(withState(Dumb))
