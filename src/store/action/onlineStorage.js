export const hydrate = (payload, fromMutation = {}, idChanged = {}) => ({
  type: 'resource:online:read',
  ...payload,
  fromMutation,
  idChanged,
  date: Date.now(),
})

export const fetchError = (error, key, shouldFetchKey) => ({
  type: 'resource:online:read:error',
  error,
  key,
  shouldFetchKey,
  date: Date.now(),
})

export const mutateError = (error, key) => ({
  type: 'resource:online:mutate:error',
  error,
  key,
  date: Date.now(),
})

export const forceRefreshSite = (siteId: string) => ({
  type: 'resource:forceRefetch',
  shouldFetch: [`site.${siteId}`],
})

export const forceRefreshSites = () => ({
  type: 'resource:forceRefetch',
  shouldFetch: ['sites'],
})
