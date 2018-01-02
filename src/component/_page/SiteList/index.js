import { connect } from 'preact-redux'
import { SiteList as Dumb } from './Dumb'

const injectState = connect(state => ({
  sites: state.resource.sites,
}))

export const SiteList = injectState(Dumb)
