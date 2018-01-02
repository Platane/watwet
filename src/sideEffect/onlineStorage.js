import {
  hydrateVegetalDictionary,
  hydrateSites,
} from '~/store/action/onlineStorage'

import { vegetals } from '~/__fixtures__/vegetals'
import { sites } from '~/__fixtures__/sites'

export const init = store => {
  store.dispatch(hydrateVegetalDictionary(vegetals))
  store.dispatch(hydrateSites(sites))
}
