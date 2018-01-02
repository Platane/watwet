import { h, Component } from 'preact'
import styled from 'preact-emotion'

const countVegetal = levels =>
  Object.keys(levels).reduce(
    (sum, key) => sum + levels[key].population.length,
    0
  )

export const Site = ({ info, levels, onClick }) => (
  <Container onClick={onClick}>
    <Name>{info.name}</Name>
    <VegetalCount>{`${countVegetal(levels)} species`}</VegetalCount>
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
