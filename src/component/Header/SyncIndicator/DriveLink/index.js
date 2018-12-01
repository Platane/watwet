import { connect } from 'preact-redux'
import { selectSpreadsheetUrl } from '~/store/selector/spreadsheetUrl'

import { DriveLink as Dumb } from './Dumb'

const withState = connect(state => ({
  spreadsheetUrl: selectSpreadsheetUrl(state),
}))

export const DriveLink = withState(Dumb)
