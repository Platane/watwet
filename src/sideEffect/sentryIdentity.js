import { selectCurrentUser } from '~/store/selector/currentUser'

export const init = store => {
  let userId = null

  const Raven = typeof window !== 'undefined' && window.Raven

  if (!Raven) return

  const update = () => {
    const user = selectCurrentUser(store.getState())

    if (!user || user.id == userId) return

    userId = user.id

    Raven.setUserContext({
      id: user.id,
      email: user.email,
      username: user.name,
    })
  }

  update()

  store.subscribe(update)
}
