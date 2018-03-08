import type { Route } from '~/service/router/type'

export const routes: Route[] = [
  { path: '/', key: 'habitatList' },
  { path: '/habitat', key: 'habitatList' },
  { path: '/habitat/create', key: 'habitatCreate' },
  { path: '/habitat/:habitatId', key: 'habitat' },
  { path: '/habitat/:habitatId/:layer', key: 'habitat' },
]
