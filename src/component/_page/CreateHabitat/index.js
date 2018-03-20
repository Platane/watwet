import { connect } from 'preact-redux'
import { CreateHabitat as Dumb } from './Dumb'
import { createHabitat } from '~/store/action/mutation'
import { selectCurrentSiteId } from '~/store/selector/currentSite'
import withState from './hoc.state'

const injectState = connect(
  state => ({
    siteId: selectCurrentSiteId(state),
  }),
  { createHabitat }
)

export const CreateHabitat = injectState(withState(Dumb))
