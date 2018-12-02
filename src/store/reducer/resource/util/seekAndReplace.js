/**
 * given an object, and a string A and a string B,
 * search value or key which contains A, and repalce A with B
 */
export const seekAndReplace = (
  o: any,
  a: string | number,
  b: string | number
) => {
  if (typeof o === 'string') return o.replace(a, b)

  if (typeof o === 'number' && a == b) return b

  if (isArray(o)) {
    const copy = o.map(x => seekAndReplace(x, a, b))

    return o.every((_, i) => o[i] == copy[i]) ? o : copy
  }

  if (isObject(o)) {
    const copy = {}

    for (let key in o) {
      const key_ = key.replace(a, b)

      copy[key_] = seekAndReplace(o[key], a, b)
    }

    return Object.keys(o).every(key => o[key] === copy[key]) ? o : copy
  }

  return o
}
