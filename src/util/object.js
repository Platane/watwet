export const isObject = (x: any) => !!(x && typeof x === 'object')
export const isArray = (x: any) => Array.isArray(x)

export const flattenObject = (o: any, prefix: string = '') => {
  if (!isObject(o)) return o

  const copy = {}

  Object.keys(o).forEach(key => {
    const next = flattenObject(o[key])

    if (!isObject(next)) return (copy[key] = next)

    Object.keys(next).forEach(u => (copy[key + '.' + u] = next[u]))
  })

  return copy
}

export const deepEqual = (a: any, b: any) => {
  if (isObject(a))
    return (
      isObject(b) &&
      Object.keys(a).length === Object.keys(b).length &&
      Object.keys(a).every(i => deepEqual(a[i], b[i]))
    )

  if (isArray(a))
    return (
      isArray(b) && a.length === b.length && a.every(i => deepEqual(a[i], b[i]))
    )

  return a === b
}

export const trimProperties = (toTrim: string) => (o: any) => {
  if (Array.isArray(o)) return o.map(trimProperties(toTrim))

  if (isObject(o)) {
    const copy = {}
    Object.keys(o)
      .filter(key => !toTrim.includes(key))
      .forEach(key => (copy[key] = trimProperties(toTrim)(o[key])))

    return copy
  }

  return o
}

export const shallowEqual = (a: any, b: any) =>
  isObject(a) === isObject(b) &&
  (!isObject(a)
    ? a === b
    : Object.keys(a).length === Object.keys(b).length &&
      Object.keys(a).every(key => a[key] === b[key]))
