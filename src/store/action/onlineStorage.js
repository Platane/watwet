export const hydrate = (payload, fromMutation = {}, idChanged = {}) => ({
  type: 'resource:online:read',
  ...payload,
  fromMutation,
  idChanged,
})
