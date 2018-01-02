import { connect } from 'preact-redux'
import { HabitatList as Dumb } from './Dumb'
import { goTo } from '~/store/action/router'

const injectState = connect(
  state => ({
    habitats: state.resource.habitats,
  }),
  dispatch => ({
    goToHabitat: habitat => dispatch(goTo(`habitat/${habitat.id}`)),
  })
)

export const HabitatList = injectState(Dumb)
