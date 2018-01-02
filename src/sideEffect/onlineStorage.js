import {
  hydrateVegetalDictionary,
  hydrateHabitats,
} from '~/store/action/onlineStorage'

import { vegetals } from '~/__fixtures__/vegetals'
import { habitats } from '~/__fixtures__/habitats'

export const init = store => {
  store.dispatch(hydrateVegetalDictionary(vegetals))
  store.dispatch(hydrateHabitats(habitats))
}
