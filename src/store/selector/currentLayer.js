const d = {
  a: 'arbustive',
  h: 'herbacee',
  A: 'arboree',
}

const _d = {}
for (let i in d) _d[d[i]] = i

export const filterVegetal = key =>
  key ? ({ layer }) => key === layer : () => true

export const keyToLabel = key => d[key]

export const selectCurrentLayer = state => _d[state.router.param.layer] || null
