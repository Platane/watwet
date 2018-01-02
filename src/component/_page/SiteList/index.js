import { connect } from 'preact-redux'
import { SiteList as Dumb } from './Dumb'
import { goTo } from '~/store/action/router'

const injectState = connect(
  state => ({
    sites: state.resource.sites,
  }),
  dispatch => ({
    goToSite: site => dispatch(goTo(`site/${site.id}`)),
  })
)

export const SiteList = injectState(Dumb)
