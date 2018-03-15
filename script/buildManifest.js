const fs = require('fs')
const path = require('path')

const manifest = require('../src/manifest.json')
const package = require('../package.json')

manifest.version = package.version
manifest.description = package.description
manifest.short_name = manifest.name = package.name

fs.writeFileSync(
  path.resolve(__dirname, '../dist/manifest.json'),
  JSON.stringify(manifest)
)
