import { h } from 'preact'

import wrapMediaQuery from './hoc.mediaQuery'

export default components =>
  wrapMediaQuery(
    props =>
      (components[props.layout] && h(components[props.layout], props)) || null
  )
