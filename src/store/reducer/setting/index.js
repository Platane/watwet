import {
  DEFAULT_VEGETAL_DICTIONARY_SPREADSHEET_ID,
  DEFAULT_HABITAT_DICTIONARY_SPREADSHEET_ID,
} from '~/config'
import { set } from '~/util/reduxHelper'
import type { State } from './type'

export const defaultState = {
  vegetalDictionarySpreadsheetId: DEFAULT_VEGETAL_DICTIONARY_SPREADSHEET_ID,
  habitatDictionarySpreadsheetId: DEFAULT_HABITAT_DICTIONARY_SPREADSHEET_ID,
}

export const reduce = (state: State, action): State => {
  state = state === false || state ? state : defaultState

  switch (action.type) {
    case 'setting:set':
      return { ...state, ...action.setting }

    case 'localStorage:read':
      if (action.setting) return { ...state, ...action.setting }
      break

    case 'setting:reset':
      return defaultState
  }
  return state
}

export const reduceEnhancer = reduce => (state, action) => {
  let newState = reduce(state, action)

  if (
    newState.setting.vegetalDictionarySpreadsheetId !=
    state.setting.vegetalDictionarySpreadsheetId
  )
    newState = set(
      newState,
      ['resource', 'original', 'vegetalDictionary'],
      null
    )

  if (
    newState.setting.habitatDictionarySpreadsheetId !=
    state.setting.habitatDictionarySpreadsheetId
  )
    newState = set(
      newState,
      ['resource', 'original', 'habitatDictionary'],
      null
    )

  return newState
}

export const reduceGlobal = (state, action) => {
  return state
}
