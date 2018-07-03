import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { grey, vibrant } from '~/component/_abstract/palette'

export const AppearAnimation = ({ disabled, children, ...props }) => (
  <Container {...props}>{children}</Container>
)

AppearAnimation.defaultProps = {
  duration: 160,
  type: 'slide-left',
  n: 0,
}

const createKeyframes = ({ type, n }) =>
  (type === 'slide-left' &&
    keyframes`
      0%                      {opacity:0; transform: translate3d(-300px,0,0)}
      ${(n / (n + 1)) * 100}% {opacity:0; transform: translate3d(-300px,0,0)}
      100%                    {opacity:1; transform: translate3d(0,0,0)}
    `) ||
  (type === 'fade' &&
    keyframes`
        0%                      {opacity:0}
        ${(n / (n + 1)) * 100}% {opacity:0}
        100%                    {opacity:1}
    `) ||
  ''

const createAnimation = props =>
  `${createKeyframes(props)} ${props.duration * (props.n + 1)}ms linear`

const getAnimationKey = ({ duration, n, type }) => `${type}-${duration}-${n}`

const mem = {}
const getAnimation = props => {
  const key = getAnimationKey(props)
  return (mem[key] = mem[key] || createAnimation(props))
}

const Container = styled.div`
  animation: ${props => getAnimation(props)};
`
