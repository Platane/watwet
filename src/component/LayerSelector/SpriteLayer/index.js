import { h, Component } from 'preact'
import styled, { keyframes, css } from 'preact-emotion'
import { trio } from '~/component/_abstract/palette'
import { Bush, Herb, PineTree } from '~/component/Icon'
import { WIDTH, ALPHA } from '../constant'

const getNSprite = x => Math.floor(x * 10)

const transform = (layer, j) => {
  const i =
    (layer == 'A' && 3) || (layer == 'a' && 7) || (layer == 'h' && 9) || 89
  const k = 8 + i * 17 + i * j * i * 7 + j * j * j

  const x = j * 20 + k % 16 - 8 - 16
  const y = k % (WIDTH - 6) - WIDTH / 2

  return `
    translate3d(${x}px,${y}px,0)
    skew(-35deg, 0deg)
    rotateX(-${45}deg)
  `
}

const common = css`
  transform-style: preserve-3d;
  transform-origin: center bottom;
  filter: brightness(1.1);
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
`

const Sprite = ({ layer, ...props }) =>
  (layer == 'A' && <PineTree {...props} />) ||
  (layer == 'a' && <Bush {...props} />) ||
  (layer == 'h' && <Herb {...props} />) ||
  null

export const SpriteLayer = ({ layer, value, color }) => (
  <Container>
    {Array.from({ length: getNSprite(value) }).map((_, i) => (
      <Sprite
        key={i}
        className={common}
        layer={layer}
        color1={color}
        color2={color}
        style={{
          transform: transform(layer, i),
        }}
      />
    ))}
  </Container>
)

// prettier-ignore
const Container = styled.div`
  transform-style: preserve-3d;
`
