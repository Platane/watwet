import { init as initGet } from './get'
import { init as initSet } from './set'

export const init = (...args) => [initGet, initSet].forEach(fn => fn(...args))
