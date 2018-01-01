import { routeValidator } from '../routeValidator'

const routes = [
  { path: 'a', key: 'a' },
  { path: 'a/b/c', key: 'abc' },
  { path: 'u/w', key: 'uw' },
  { path: 'u/:id', key: 'uid' },
  { path: 'u/y/h', key: 'uyh' },
]

const getRoute = routeValidator(routes)

it('should route to null if route does not exist', () => {
  expect(getRoute('b')).toEqual({ key: null, param: {}, path: '/' })
})

it('should route to existing route', () => {
  expect(getRoute('a/b/c')).toEqual({ key: 'abc', param: {}, path: '/a/b/c' })
})

it('should fallback to closest route', () => {
  expect(getRoute('a/u/c')).toEqual({ key: 'a', param: {}, path: '/a' })
})

it('should grab param', () => {
  expect(getRoute('u/yolo')).toEqual({
    key: 'uid',
    param: { id: 'yolo' },
    path: '/u/yolo',
  })
})

it('should route to / if route does not exist, and / if defined', () => {
  expect(routeValidator([...routes, { path: '/', key: 'home' }])('b')).toEqual({
    key: 'home',
    param: {},
    path: '/',
  })
})
