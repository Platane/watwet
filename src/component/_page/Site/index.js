import { connect } from 'preact-redux'
import { Site as mobile } from './Dumb.mobile'
import { Site as desktop } from './Dumb.mobile'
// import { goTo } from '~/store/action/'
import { selectCurrentSite } from '~/store/selector/currentSite'
import layoutMultiplexor from '~/component/_abstract/hoc.layoutMultiplexor'

const injectState = connect(
  state => ({
    site: selectCurrentSite(state),
  }),
  dispatch => ({
    updateSite: site => dispatch({ type: 'update:site', site }),
  })
)

export const Site = injectState(layoutMultiplexor({ desktop, mobile }))
