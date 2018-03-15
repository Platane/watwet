import { connect } from 'preact-redux'
import { Login as Dumb } from './Dumb'
import { login } from '~/store/action/auth'

const injectState = connect(state => ({ pending: state.auth.pending }), {
  login,
})

export const Login = injectState(Dumb)
