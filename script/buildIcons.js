const { convert } = require('convert-svg-to-png')
const toIco = require('to-ico')
const path = require('path')
const fs = require('fs')

const source = fs
  .readFileSync(path.resolve(__dirname, '../src/asset/logo/logo.svg'))
  .toString()

Promise.all(
  [16, 32, 48, 96, 144, 192, 256, 512].map(async size => {
    const png = await convert(source, {
      width: size,
      height: size,
      puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] },
    })

    fs.writeFileSync(
      path.resolve(__dirname, '../dist', `icon${size}x${size}.png`),
      png
    )

    if ([16, 32, 48].includes(size)) {
      const ico = await toIco(png)

      fs.writeFileSync(
        path.resolve(__dirname, '../dist', `icon${size}x${size}.ico`),
        ico
      )

      if (size === 16)
        fs.writeFileSync(path.resolve(__dirname, '../dist', `favicon.ico`), ico)
    }
  })
)
