import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { LevelSelector } from '~/component/LevelSelector'

export const Habitat = ({ habitat, updateHabitat }) => (
  <Container>
    {habitat && habitat.info.name}

    <LevelSelector
      habitat={habitat}
      onHabitatChange={updateHabitat}
      onSelect={e => console.log(e)}
    />
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
