import { init as initGet } from './get'
import { init as initSet } from './set'

export const init = api => (...args) =>
  [initGet, initSet].forEach(fn => fn(api)(...args))
