import { connect } from 'preact-redux'
import { Link as Dumb } from './Dumb'
import { goTo } from '~/store/action/router'

const injectState = connect(null, { goTo })

export const Link = injectState(Dumb)
