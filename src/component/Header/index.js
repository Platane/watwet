import { connect } from 'preact-redux'
import { Header as Dumb } from './Dumb'
import { goTo } from '~/store/action/router'
import { selectCurrentUser } from '~/store/selector/currentUser'
import { selectSpreadSheetUrl } from '~/store/selector/spreadSheetUrl'
import { selectOffline } from '~/store/selector/offline'

const injectState = connect(
  state => ({
    user: selectCurrentUser(state),
    offline: selectOffline(state),
    spreadSheetUrl: !selectOffline(state) && selectSpreadSheetUrl(state),
  }),
  { goToHome: () => goTo('/') }
)

export const Header = injectState(Dumb)
