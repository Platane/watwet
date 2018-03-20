import { connect } from 'preact-redux'
import { HabitatList as Dumb } from './Dumb'
import { goTo } from '~/store/action/router'
import {
  selectCurrentSite,
  selectCurrentSiteId,
} from '~/store/selector/currentSite'

const injectState = connect(
  state => {
    const site = selectCurrentSite(state)

    return {
      siteId: selectCurrentSiteId(state),
      habitats: (site && site.habitats) || [],
    }
  },
  dispatch => ({
    goToHabitat: siteId => habitat =>
      dispatch(goTo(`site/${siteId}/habitat/${habitat.id}`)),
    goToCreateHabitat: siteId =>
      dispatch(goTo(`site/${siteId}/habitat/create`)),
  })
)

export const HabitatList = injectState(Dumb)
