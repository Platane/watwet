import { h } from 'preact'
import { Bush } from './Bush'
import { Herb } from './Herb'
import { PineTree } from './PineTree'
import { trio } from '~/component/_abstract/palette'

export const Layer = ({ layer, color1, color2, ...props }) =>
  (layer == 'A' && (
    <PineTree
      {...props}
      color1={color1 || trio[2]}
      color2={color2 || trio[2]}
    />
  )) ||
  (layer == 'a' && (
    <Bush color1={color1 || trio[1]} color2={color2 || trio[1]} {...props} />
  )) ||
  (layer == 'h' && (
    <Herb color1={color1 || trio[0]} color2={color2 || trio[0]} {...props} />
  )) ||
  null
