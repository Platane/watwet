import { connect } from 'preact-redux'
import { Name as Dumb } from './Dumb'
import {
  selectHabitatDictionary,
  selectHabitat_byCodeCorindeBiotipe,
} from '~/store/selector/dictionaries'

const injectState = connect(state => ({
  habitatNameDictionary: selectHabitatDictionary(state) || [],
  habitat_byCodeCorindeBiotipe: selectHabitat_byCodeCorindeBiotipe(state),
}))

export const Name = injectState(Dumb)
