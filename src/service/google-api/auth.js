type User = {
  id: string,
  name: string,
  picture_url: string,
}

export const getCurrentUser = (): User | null => {
  const gapi = window.gapi

  const user = gapi.auth2.getAuthInstance().currentUser.get()

  const profile = user.getBasicProfile()

  return (
    (user && {
      id: profile.getId(),
      name: profile.getName(),
      picture_url: profile.getImageUrl(),
    }) ||
    null
  )
}

export const signIn = () => {
  const gapi = window.gapi

  return gapi.auth2.getAuthInstance().signIn()
}

export const signOut = () => {
  const gapi = window.gapi

  return gapi.auth2.getAuthInstance().signOut()
}
