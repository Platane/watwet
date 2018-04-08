import { connect } from 'preact-redux'
import { Header as Dumb } from './Dumb'
import { goTo } from '~/store/action/router'
import { selectCurrentUser } from '~/store/selector/currentUser'
import { selectSpreadsheetUrl } from '~/store/selector/spreadsheetUrl'
import { selectOffline } from '~/store/selector/offline'

const injectState = connect(state => ({
  user: selectCurrentUser(state),
  offline: selectOffline(state),
  spreadsheetUrl:
    !selectOffline(state) &&
    ['habitatList', 'habitat', 'site', 'siteList'].includes(state.router.key) &&
    selectSpreadsheetUrl(state),
}))

export const Header = injectState(Dumb)
