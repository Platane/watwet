// export const primary = '#E54B4B'
// export const secondary = '#FFA987'
//
export const white = '#fefefe'
export const grey = '#444140'
export const black = '#000'
export const water = '#6473fc'

export const variant = [
  'hsl(35, 100%, 77%)',
  'hsl(24, 100%, 66%)',
  'hsl(204, 96%, 69%)',
  'hsl(234, 96%, 69%)',
]

export const vibrant = [
  '#6B0848',
  '#A40A3C',
  '#EC610A',
  '#FFC300',
  'hsl(234,96%,69%)',
]

export const vibrant1 = 'hsl(25, 79%, 57%)'
export const vibrant2 = 'hsl(9, 84%, 27%)'

export const trio = [
  // 'hsl(93, 46%, 72%)',
  // 'hsl(104, 27%, 30%)',
  // 'hsl(99, 17%, 43%)',
  'hsl(92, 31%, 31%)',
  'hsl(100, 35%, 21%)',
  'hsl(107, 31%, 21%)',
  // 'hsl(39, 19%, 29%)',
]

// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
const toInt = x => {
  const b64 = btoa(x)

  return b64
    .toLowerCase()
    .replace(/([^a-z\d])/g, '')
    .split('')
    .reduce((hash, x) => {
      const char = parseInt(x, 36)

      hash = (hash << 5) - hash + char

      return hash & hash
    }, 0)
}

export const fromHash = (hash: string) =>
  `hsl(${(toInt(hash) % 30) * 12},60%,60%)`
