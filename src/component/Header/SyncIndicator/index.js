import { connect } from 'preact-redux'
import { SyncIndicator as Dumb } from './Dumb'

const shouldDisplay = state =>
  ['habitatList', 'habitat', 'habitatEdit', 'site', 'siteList'].includes(
    state.router.key
  )

const withState = connect(state => ({
  display: shouldDisplay(state),
}))

export const SyncIndicator = withState(Dumb)
