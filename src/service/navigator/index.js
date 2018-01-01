import {
  stringify as querystringStringify,
  parse as querystringParse,
} from 'querystring'

type Location = {
  pathname: string,
  query: Object,
  hash: Object,
}

export const pushState = (url: string) => history.pushState({}, '', url)
// console.log( 'history.push', url ) ||

export const replaceState = (url: string) => history.replaceState({}, '', url)
// console.log( 'history.replace', url ) ||

export const getLocation = (): Location => ({
  pathname: window.location.pathname,
  query: querystringParse((window.location.search || '').replace(/^\?/, '')),
  hash: querystringParse((window.location.hash || '').replace(/^#/, '')),
})
