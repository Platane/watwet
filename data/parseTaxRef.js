const fs = require('fs')
const csvtojson = require('csvtojson')
const json2csv = require('json2csv')

const pickArray = spec => arr => spec.map(i => arr[i])

const isSuffix = suffix => x => x.slice(0, suffix.length) === suffix

const checkAt = (fn, i) => arr => fn(arr[i])

const normalize = x =>
  x
    .toLowerCase()
    .replace(/[^\w_]+/g, ' ')
    .trim()

const batch = n => arr =>
  Array.from({ length: Math.ceil(arr.length / n) }).map((_, i) =>
    arr.slice(i * n, (i + 1) * n)
  )

const wrap = a => (a && `"${a}"`) || ''

const toObject = header => arr => {
  const o = {}
  header.forEach((key, i) => (o[key] = arr[i]))
  return o
}

const [header, ...lines] = fs
  .readFileSync('TAXREFv11.txt')
  .toString()
  .split('\n')

  // select only plants
  .filter((x, i) => i === 0 || isSuffix('Plantae')(x))
  .map(x => x.trim().split('\t'))

  // keep only this properties
  .map(pickArray([9, 12, 14, 19]))

// stats function,
//  give the percent of line that have data for each properties
const countExistingValues = lines =>
  lines
    .reduce((sum, arr) => {
      arr.forEach((x, i) => (sum[i] = (sum[i] || 0) + !!x))
      return sum
    }, [])
    .map(x => Math.round(x / lines.length * 100) + '%')

// stats function,
//  enumerate all the values that the properties have accross the data
const enumarateValues = (items, i) =>
  items.reduce((o, arr) => {
    if (arr[i]) o[arr[i]] = (o[arr[i]] || 0) + 1

    return o
  }, {})

// console.log(enumarateValues(lines, 0))
console.log('completion:\n', toObject(header)(countExistingValues(lines)))

console.log('\nsamples:\n', lines.slice(0, 3).map(toObject(header)))

const csv = [header, ...lines]
  .map(arr => [arr[0], arr[1], wrap(arr[2]), wrap(arr[3])].join(','))
  .join('\n')

fs.writeFileSync('taxrefv11_plantea.csv', csv)
