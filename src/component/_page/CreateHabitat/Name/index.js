import { connect } from 'preact-redux'
import { Name as Dumb } from './Dumb'
import { selectHabitatNameDictionary } from '~/store/selector/dictionaries'

const injectState = connect(state => ({
  habitatNameDictionary: selectHabitatNameDictionary(state),
}))

export const Name = injectState(Dumb)
