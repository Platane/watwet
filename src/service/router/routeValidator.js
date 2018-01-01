import { parse as parseQueryString } from 'querystring'
import type { Route, Output } from './type'

type RouteTree = {
  // the node have a key if it is reachable
  key: string | null,

  // if the label is __var__, this hold the value name
  varName: string | null,

  children: { ['__var__' | string]: RouteTree },
}

const createRouteTree = (routes: Route[]): RouteTree => {
  const routeTree = {
    key: null,
    children: {},
    varName: null,
  }

  routes.forEach(r => {
    const path = r.path.split('/').filter(Boolean)

    let node: RouteTree = routeTree
    path.forEach(l => {
      const next = l[0] === ':' ? '__var__' : l

      node = node.children[next] = node.children[next] || {
        key: null,
        children: {},
        varName: null,
      }

      if (l[0] === ':') node.varName = l.slice(1)
    })

    node.key = r.key
  })

  return routeTree
}

export const routeValidator = (routes: Route[]) => {
  const routeTree: RouteTree = createRouteTree(routes)

  return (pathname: string): Output => {
    const param: { [string]: string } = {}

    let node = routeTree
    let path = []
    let key = routeTree.key || null
    let validPath = '/'

    pathname
      .split('/')
      .filter(Boolean)
      .forEach(l => {
        if (!node) return

        let nextNode

        if (node.children[l]) {
          // exact match
          nextNode = node.children[l]
        } else if (node.children['__var__']) {
          // match the variable
          nextNode = node.children['__var__']
          param[nextNode.varName || 'value'] = l
        }

        node = nextNode

        if (node) {
          path.push(l)

          if (node.key) {
            key = node.key
            validPath = '/' + path.join('/')
          }
        }
      })

    return {
      key,
      path: validPath,
      param,
    }
  }
}
