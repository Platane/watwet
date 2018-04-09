import { Setting as Dumb } from './Dumb'
import { connect } from 'preact-redux'
import * as settingActions from '~/store/action/setting'
import { defaultState } from '~/store/reducer/setting'
import {
  selectVegetalDictionary,
  selectHabitatDictionary,
} from '~/store/selector/dictionaries'
import { deepEqual } from '~/util/object'

const injectState = connect(
  state => ({
    ...state.setting,
    isDefault: deepEqual(state.setting, defaultState),
    habitatDictionarySpreadsheetUrl:
      'https://docs.google.com/spreadsheets/d/' +
      state.setting.habitatDictionarySpreadsheetId,
    vegetalDictionarySpreadsheetUrl:
      'https://docs.google.com/spreadsheets/d/' +
      state.setting.vegetalDictionarySpreadsheetId,

    habitatDictionaryLoaded: !state.resource.shouldFetch['habitatDictionary'],
    vegetalDictionaryLoaded: !state.resource.shouldFetch['vegetalDictionary'],
  }),
  settingActions
)

export const Setting = injectState(Dumb)
