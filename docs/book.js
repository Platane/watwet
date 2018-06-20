var pkg = require('../package.json')

module.exports = {
  title: 'watwet',

  root: './',

  gitbook: '>=3.0.0',

  plugins: ['prism', '-highlight', 'github'],

  variables: {
    version: pkg.version,
  },

  pluginsConfig: {
    github: {
      url: 'https://github.com/platane/watwet',
    },
  },

  styles: {
    website: 'styles/website.css',
  },
}
