import { connect } from 'preact-redux'
import { HabitatList as Dumb } from './Dumb'
import { goTo } from '~/store/action/router'
import { selectCurrentSite } from '~/store/selector/currentSite'

const injectState = connect(
  state => {
    const site = selectCurrentSite(state)

    return {
      habitats: (site && site.habitats) || [],
    }
  },
  dispatch => ({
    goToHabitat: habitat => dispatch(goTo(`habitat/${habitat.id}`)),
  })
)

export const HabitatList = injectState(Dumb)
