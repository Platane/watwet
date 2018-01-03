import { write, read } from '~/service/localStorage'
import { selectCurrentUser } from '~/store/selector/currentUser'
import { read as readAction } from '~/store/action/localStorage'

export const init = store => {
  const update = () => {
    const state = store.getState()
    write('watwet-user', selectCurrentUser(state))
  }

  store.dispatch(
    readAction({
      user: read('watwet-user'),
    })
  )

  update()

  store.subscribe(update)
}
