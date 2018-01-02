import {
  stringify as querystringStringify,
  parse as querystringParse,
} from 'querystring'
import { PATHNAME_BASE } from '~/config'

const toArray = path => path.split('/').filter(Boolean)
const toPath = arr => arr.join('/')

type Location = {
  pathname: string,
  query: Object,
  hash: Object,
}

const buildUrl = (basePath: string) => (
  pathname: string,
  query = {},
  hash = {}
) =>
  [
    window.location.origin,

    '/' + toPath([...toArray(basePath), ...toArray(pathname)]),

    Object.keys(query).length && '?' + querystringStringify(query),

    Object.keys(hash).length && '#' + querystringStringify(hash),
  ]
    .filter(Boolean)
    .join('')

const parsePathname = (basePath: string) => (pathname: string) => {
  const b = toArray(basePath)
  const p = toArray(pathname)

  if (b.every((_, i) => b[i] === p[i])) p.splice(0, b.length)
  return '/' + toPath(p)
}

export const pushState = (...args) =>
  history.pushState({}, '', buildUrl(PATHNAME_BASE)(...args))

export const replaceState = (...args) =>
  history.replaceState({}, '', buildUrl(PATHNAME_BASE)(...args))

export const getLocation = (): Location => ({
  pathname: parsePathname(PATHNAME_BASE)(window.location.pathname),
  query: querystringParse((window.location.search || '').replace(/^\?/, '')),
  hash: querystringParse((window.location.hash || '').replace(/^#/, '')),
})
