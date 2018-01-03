import { h, Component } from 'preact'
import styled from 'preact-emotion'

export const Habitat = ({ info, population, onClick }) => (
  <Container onClick={onClick}>
    <Name>{info.name}</Name>
    <VegetalCount>{`${population.length} species`}</VegetalCount>
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
  min-width: 300px;
`

const Name = styled.div``
const VegetalCount = styled.div`
  font-size: 0.8em;
  margin-left: auto;
`
