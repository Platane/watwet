import type { Route } from '~/service/router/type'

export const routes: Route[] = [
  { path: '/', key: 'siteList' },
  { path: '/setting', key: 'setting' },
  { path: '/site', key: 'siteList' },
  { path: '/site/create', key: 'siteCreate' },
  { path: '/site/:siteId', key: 'habitatList' },
  { path: '/site/:siteId/habitat', key: 'habitatList' },
  { path: '/site/:siteId/habitat/create', key: 'habitatCreate' },
  { path: '/site/:siteId/habitat/:habitatId', key: 'habitat' },
  { path: '/site/:siteId/habitat/:habitatId/edit', key: 'habitatEdit' },
  { path: '/site/:siteId/habitat/:habitatId/:layer', key: 'habitat' },
]
