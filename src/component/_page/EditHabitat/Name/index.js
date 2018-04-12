import { connect } from 'preact-redux'
import { Name as Dumb } from './Dumb'
import { selectHabitatDictionary } from '~/store/selector/dictionaries'

const injectState = connect(state => ({
  habitatNameDictionary: selectHabitatDictionary(state) || [],
}))

export const Name = injectState(Dumb)
