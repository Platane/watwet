import 'unfetch/polyfill'
import { bootstrapStore } from './util'
import { goTo } from '~/store/action/router'
import { updateHabitat } from '~/store/action/mutation'
import { waitFor } from '~/util/waitFor'
import { selectSites } from '~/store/selector/sites'

const wait = delay => new Promise(r => setTimeout(r, delay))

it('should load the sites at init', async () => {
  const store = bootstrapStore()

  /**
   * wait for the sites to be loaded
   */
  await waitFor(store, state => selectSites(state).length)
})

it('should mutate habitat name', async () => {
  const store = bootstrapStore()

  await waitFor(store, state => selectSites(state).length)

  const site = selectSites(store.getState())[0]
  const habitat = site.habitats[0]

  store.dispatch(
    updateHabitat({ ...habitat, info: { ...habitat, name: '1234' } })
  )

  await waitFor(
    store,
    state => selectSites(state)[0].habitats[0].info.name === '1234'
  )

  /**
   * TODO
   * should check that the habitat is actually update in the online store
   */
})
