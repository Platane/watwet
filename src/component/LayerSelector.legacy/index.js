import { h, Component } from 'preact'
import styled, { keyframes, css } from 'preact-emotion'
import { RepartitionBar } from '~/component/RepartitionBar'
import { SpriteLayer } from './SpriteLayer'
import { fromHash } from '~/component/_abstract/palette'
import { trio } from '~/component/_abstract/palette'
import {
  ALPHA,
  WIDTH,
  LENGTH,
  FALL_LENGTH,
  MARGIN,
  THICKNESS,
} from './constant'

{
  /* <input type="text" value={value} onBlur={e => onChange(e.target.value)} /> */
}

const layerLabels = [
  { key: 'h', color: trio[0] },
  { key: 'a', color: trio[1] },
  { key: 'A', color: trio[2] },
]

export const LayerSelector = ({ layers, onChange, onSelect }) => (
  <Container>
    {layerLabels.map(({ key, label, color, Icon }, i) => (
      <Layer
        style={{ transform: `translateZ(${-(i - 1) * (WIDTH + MARGIN)}px)` }}
      >
        <Front color={color} style={{ width: `${layers[key] * LENGTH}px` }} />
        <Front2 color={color} />
        <Plane color={color} style={{ width: `${layers[key] * LENGTH}px` }}>
          <SpriteLayer layer={key} value={layers[key]} color={color} />
        </Plane>
        <Fall color={color} />
      </Layer>
    ))}
  </Container>
)

// prettier-ignore
const Container = styled.div`
  height: 300px;
  width: 300px;
  position: relative;
  transform: scale3d(1,1,1)
    rotateX(-${ALPHA}deg)
    matrix3d(
     -1     , 0    , 0     , 0,
      0     , 1    , 0     , 0,
     -0.707 , 0    , 0.707 , 0,
      0     , 0    , 0     , 1
    );
  transform-origin: center;
  transform-style: preserve-3d;
`
const Plane = styled.div`
  background-color: ${props => props.color};
  transform-style: preserve-3d;

  position: absolute;
  top: 0;
  left: 0;

  height: ${WIDTH}px;
  transform: rotateX(90deg);
  transform-origin: top;
`
const Fall = styled.div`
  background-color: ${props => props.color};
  filter: brightness(1.06);
  transform-style: preserve-3d;

  position: absolute;
  top: 0;
  left: 0;

  height: ${FALL_LENGTH}px;
  width: ${WIDTH}px;
  transform-origin: left;
  transform: translate3d(0, -1px, 0) rotateY(-90deg);
`
const Front = styled.div`
  background-color: ${props => props.color};
  filter: brightness(0.8);
  transform-style: preserve-3d;

  position: absolute;
  top: 0;
  left: 0;

  height: ${THICKNESS * 1.8}px;
  transform-origin: left;
  transform: translateZ(${WIDTH - 1}px);
`
const Front2 = styled.div`
  background-color: ${props => props.color};
  filter: brightness(0.8);
  transform-style: preserve-3d;

  position: absolute;
  top: 0;
  left: 0;

  width: ${THICKNESS}px;
  height: ${FALL_LENGTH}px;
  transform-origin: left;
  transform: translateZ(${WIDTH - 1}px);
`
const Layer = styled.div`
  transform-style: preserve-3d;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
`
