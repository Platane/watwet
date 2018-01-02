import type { Route } from '~/service/router/type'

export const routes: Route[] = [
  { path: '/', key: 'habitatList' },
  { path: '/habitat', key: 'habitatList' },
  { path: '/habitat/:habitatId', key: 'habitat' },
]
