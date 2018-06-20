const fs = require('fs')
const path = require('path')

const manifest = require('../src/manifest.json')
const package = require('../package.json')

manifest.version = package.version
manifest.description = package.description
manifest.short_name = manifest.name = package.name

manifest.icons = [16, 32, 48, 144, 192, 256, 512].map(size => ({
  sizes: `${size}x${size}`,
  src: `./icon${size}x${size}.png`,
  type: 'image/png',
}))

fs.writeFileSync(
  path.resolve(__dirname, '../dist/manifest.json'),
  JSON.stringify(manifest)
)
