export const hydrate = (payload, fromMutation = {}) => ({
  type: 'resource:online:read',
  ...payload,
  fromMutation,
})
