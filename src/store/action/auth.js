export const authFail = err => ({
  type: 'auth:fail',
  err,
})

export const authSuccess = user => ({
  type: 'auth:success',
  user,
})

export const logout = () => ({
  type: 'auth:require:logout',
})
