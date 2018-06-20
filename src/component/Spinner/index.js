import { h } from 'preact'
import styled, { keyframes } from 'preact-emotion'

const spin = keyframes`
  0%{ transform: rotate(0deg)};
  100%{ transform: rotate(360deg)};
`

export const Spinner = styled.span`
  animation: ${spin} 600ms linear Infinite;

  font-size: ${props => props.size || 22}px;

  color: ${props => props.color};

  &::after {
    content: '↻';
  }
`
