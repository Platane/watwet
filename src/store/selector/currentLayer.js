const d = {
  a: 'arbustive',
  h: 'herbacee',
  A: 'arboree',
}

const _d = {}
for (let i in d) _d[d[i]] = i

export const filterPopulation = key =>
  key ? ({ layer }) => key === layer : () => true

export const keyToLabel = key => d[key]

export const selectCurrentLayer = state =>
  _d[state.router.query && state.router.query.strate] || null
