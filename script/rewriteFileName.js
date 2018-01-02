const fs = require('fs')
const path = require('path')

const assetManifest = require('../dist/assetManifest.json')

const pathIndex = assetManifest['index.js']
const pathSw = 'sw.js'
// const pathSw = assetManifest['sw.js']
// const newPathSw = path.basename(pathSw)
const newPathSw = 'sw.js'

// replace filename in index.html
{
  const content = fs
    .readFileSync(path.resolve(__dirname, '../src/index.html'))
    .toString()
    .replace('/index.js', '/' + pathIndex)

  fs.writeFileSync(path.resolve(__dirname, '../dist/index.html'), content)
  fs.writeFileSync(path.resolve(__dirname, '../dist/index.html'), content)
}

// replace filename in index.js
{
  const content = fs
    .readFileSync(path.resolve(__dirname, '../dist/' + pathIndex))
    .toString()
    .replace('/sw.js', '/' + newPathSw)

  fs.writeFileSync(path.resolve(__dirname, '../dist/' + pathIndex), content)
}

// replace filename in sw.js
{
  const content = fs
    .readFileSync(path.resolve(__dirname, '../dist/' + pathSw))
    .toString()
    .replace('/index.js', '/' + pathIndex)

  fs.writeFileSync(path.resolve(__dirname, '../dist/' + newPathSw), content)
}
