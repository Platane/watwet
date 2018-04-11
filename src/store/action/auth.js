export const authFail = error => ({
  type: 'auth:fail',
  error,
})

export const authSuccess = user => ({
  type: 'auth:success',
  user,
})

export const login = () => ({
  type: 'auth:require:login',
})

export const logout = () => ({
  type: 'auth:require:logout',
})
