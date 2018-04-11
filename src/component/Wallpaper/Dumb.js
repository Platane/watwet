import { h } from 'preact'
import styled, { keyframes, css } from 'preact-emotion'
import {
  paths as paths_pineTree,
  box as box_pineTree,
} from '~/component/Icon/PineTree'
import { paths as paths_bush, box as box_bush } from '~/component/Icon/Bush'
import { paths as paths_herb, box as box_herb } from '~/component/Icon/Herb'
import { vibrant, variant, trio, white } from '~/component/_abstract/palette'
import { IndirectTransition } from 'react-propstransition'

const buildPattern = (l, s) => (paths, box, color, label) => {
  const [x, y, width, height] = box

  const k = Math.min(l * s / width, l * s / height)

  return (
    <pattern
      id={`wallpaper-pattern-${label}`}
      patternUnits="userSpaceOnUse"
      x={box[0]}
      y={box[1]}
      width={l}
      height={l}
    >
      <g transform={`scale(${k},${k})`}>
        {paths.map((d, i) => <path key={i} d={d} fill={color} />)}
      </g>
    </pattern>
  )
}

const patterns = [
  buildPattern(50, 0.5)(paths_herb, box_herb, trio[0], 'herb'),
  buildPattern(50, 0.3)(paths_bush, box_bush, trio[1], 'bush'),
  buildPattern(50, 0.4)(paths_pineTree, box_pineTree, trio[2], 'pine'),
]

export const Wallpaper = ({ color, pattern }) => (
  <Container>
    <defs>{patterns}</defs>
    <SolidRect x={0} width={9999} y={0} height={9999} fill={color} />

    <IndirectTransition toTransition={pattern} delay={180}>
      {({ next, previous }) =>
        (next || previous) && (
          <PatternRect
            x={0}
            width={9999}
            y={0}
            height={9999}
            fade={(next && 'in') || (previous && 'out')}
            fill={`url(#wallpaper-pattern-${next || previous})`}
          />
        )
      }
    </IndirectTransition>
  </Container>
)

const SolidRect = styled.rect`
  opacity: 0.95;
  transition: fill 260ms linear;
`

const fadeIn = keyframes`
  0% { opacity:0}
  100% { opacity:1}
`
const fadeOut = keyframes`
  0% { opacity:1}
  30% { opacity:0}
  100% { opacity:0}
`
const PatternRect = styled.rect`
  animation: none 260ms linear;

  ${props =>
    (props.fade == 'in' &&
      css`
        animation-name: ${fadeIn};
      `) ||
    (props.fade == 'out' &&
      css`
        animation-name: ${fadeOut};
        opacity: 0;
      `)};
`

const Container = styled.svg`
  transition: background-color 180ms ease;
  position: absolute;
  opacity: 0.88;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`
