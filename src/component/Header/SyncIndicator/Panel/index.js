import { connect } from 'preact-redux'
import { Panel as Dumb } from './Dumb'
import { withState } from '../withState'

export const Panel = withState(Dumb)
