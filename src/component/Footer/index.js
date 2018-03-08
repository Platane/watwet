import styled from 'preact-emotion'
import { h, Component } from 'preact'
import { white, grey } from '~/component/_abstract/palette'

export const Footer = () => (
  <Container>
    made with <Heart>❤</Heart>
  </Container>
)

const Heart = styled.span`
  color: grey;
  margin: 0 4px;
  font-size: 1.2em;
`

const Container = styled.div`
  background-color: ${grey};
  color: ${white};
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 30px;
`
