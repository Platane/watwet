import type { Layer } from '~/type'

export { goTo } from 'declarative-router/lib/redux/action'

export const selectLayer = (layer: Layer) => ({
  type: 'location:selectLayer',
  layer,
})
