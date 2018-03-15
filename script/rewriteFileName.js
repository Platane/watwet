const fs = require('fs')
const path = require('path')

const assetManifest = require('../dist/assetManifest.json')

const pathIndex = assetManifest['index.js']
const pathSw = 'sw.js'
// const pathSw = assetManifest['sw.js']
// const newPathSw = path.basename(pathSw)
const newPathSw = 'sw.js'

const PATHNAME_BASE = process.env.PATHNAME_BASE || '/'

const replaceFileName = s =>
  s
    .replace('/index.html', PATHNAME_BASE + 'index.html')
    .replace('/index.js', PATHNAME_BASE + pathIndex)
    .replace('/sw.js', PATHNAME_BASE + newPathSw)
    .replace('__root', PATHNAME_BASE)

// replace filename in index.html
{
  const content = replaceFileName(
    fs.readFileSync(path.resolve(__dirname, '../src/index.html')).toString()
  )

  fs.writeFileSync(path.resolve(__dirname, '../dist/index.html'), content)
  fs.writeFileSync(path.resolve(__dirname, '../dist/index.html'), content)
}

// replace filename in index.js
{
  const content = replaceFileName(
    fs.readFileSync(path.resolve(__dirname, '../dist/' + pathIndex)).toString()
  )

  fs.writeFileSync(path.resolve(__dirname, '../dist/' + pathIndex), content)
}

// replace filename in sw.js
{
  const content = replaceFileName(
    fs.readFileSync(path.resolve(__dirname, '../dist/' + pathSw)).toString()
  )

  fs.writeFileSync(path.resolve(__dirname, '../dist/' + newPathSw), content)
}
