import type { Route } from '~/service/router/type'

export const routes: Route[] = [
  { path: '/', key: 'siteList' },
  { path: '/site', key: 'siteList' },
  { path: '/site/:siteId', key: 'site' },
]
