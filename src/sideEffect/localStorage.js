import { write, read } from '~/service/localStorage'
import { selectCurrentUser } from '~/store/selector/currentUser'
import { read as readAction } from '~/store/action/localStorage'

const extractStorableResource = ({
  original,
  mutated,
  dateFetched,
  dateMutated,
}) => ({ original, mutated, dateFetched, dateMutated })

export const init = store => {
  const update = () => {
    const state = store.getState()
    write('watwet-user', selectCurrentUser(state))
    write('watwet-resource', extractStorableResource(state.resource))
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
