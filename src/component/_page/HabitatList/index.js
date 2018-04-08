import { connect } from 'preact-redux'
import { HabitatList as Dumb } from './Dumb'
import {
  selectCurrentSite,
  selectCurrentSiteId,
} from '~/store/selector/currentSite'

const injectState = connect(state => {
  const site = selectCurrentSite(state)

  return {
    siteId: selectCurrentSiteId(state),
    habitats: (site && site.habitats) || [],
  }
})

export const HabitatList = injectState(Dumb)
