export const hydrate = (payload, fromMutation = {}, idChanged = {}) => ({
  type: 'resource:online:read',
  ...payload,
  fromMutation,
  idChanged,
})

export const fetchError = (error, key, shouldFetchKey) => ({
  type: 'resource:online:read:error',
  error,
  key,
  shouldFetchKey,
})

export const forceRefreshSite = (siteId: string) => ({
  type: 'resource:forceRefetch',
  shouldFetch: [`site.${siteId}`],
})

export const forceRefreshSites = () => ({
  type: 'resource:forceRefetch',
  shouldFetch: ['sites'],
})
