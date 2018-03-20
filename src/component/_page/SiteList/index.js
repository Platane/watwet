import { SiteList as Dumb } from './Dumb'
import { connect } from 'preact-redux'
import { goTo } from '~/store/action/router'
import { selectSites } from '~/store/selector/sites'

const injectState = connect(
  state => ({
    sites: selectSites(state),
  }),
  dispatch => ({
    goToSite: site => () => dispatch(goTo(`site/${site.id}`)),
    goToCreateSite: () => dispatch(goTo(`site/create`)),
  })
)

export const SiteList = injectState(Dumb)
