import { connect } from 'preact-redux'
import { EditHabitat as Dumb } from './Dumb'
import { updateHabitat, removeHabitat } from '~/store/action/mutation'
import { selectCurrentHabitat } from '~/store/selector/currentHabitat'
import withState from './hoc.state'

const injectState = connect(
  state => ({
    habitat: selectCurrentHabitat(state),
  }),
  { updateHabitat, removeHabitat }
)

export const EditHabitat = injectState(withState(Dumb))
