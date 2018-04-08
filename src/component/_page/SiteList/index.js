import { SiteList as Dumb } from './Dumb'
import { connect } from 'preact-redux'
import { selectSites } from '~/store/selector/sites'

const injectState = connect(state => ({
  sites: selectSites(state),
}))

export const SiteList = injectState(Dumb)
