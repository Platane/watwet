import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { HabitatList as List } from '~/component/HabitatList'

export const HabitatList = ({ habitats, goToHabitat }) => (
  <Container>
    {habitats && <List onClickHabitat={goToHabitat} habitats={habitats} />}
  </Container>
)

const Container = styled.div`
  max-width: 800px;
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  flex: 100px 1 1;
`
