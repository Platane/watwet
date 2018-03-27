import { connect } from 'preact-redux'
import { CreateSite as Dumb } from './Dumb'
import { createSite } from '~/store/action/mutation'
import withState from './hoc.state'

const injectState = connect(null, { createSite })

export const CreateSite = injectState(withState(Dumb))
