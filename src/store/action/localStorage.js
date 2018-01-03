export const read = (data = {}) => ({
  type: 'localStorage:read',
  ...data,
})
