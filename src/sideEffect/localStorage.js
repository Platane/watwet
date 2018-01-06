import { write, read } from '~/service/localStorage'
import { selectCurrentUser } from '~/store/selector/currentUser'
import { read as readAction } from '~/store/action/localStorage'

export const init = store => {
  const update = () => {
    const state = store.getState()
    write('watwet-user', selectCurrentUser(state))
    write('watwet-resource', {
      sites: state.resource.sites,
      habitats: state.resource.habitats,
      habitatCanonicalNames: state.resource.habitatCanonicalNames,
    })
  }

  store.dispatch(
    readAction({
      user: read('watwet-user'),
      resource: read('watwet-resource'),
    })
  )

  update()

  store.subscribe(update)
}
