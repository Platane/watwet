import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { LayerSelector } from '~/component/LayerSelector'
import { VegetalListWithSearch } from '~/component/VegetalListWithSearch'

export const Habitat = ({ habitat, vegetals, updateHabitat }) => (
  <Container>
    <LayerSelector
      layers={habitat.layers}
      onChange={layers => updateHabitat({ ...habitat, layers })}
      onSelect={e => console.log(e)}
    />
    <VegetalListWithSearch
      vegetals={vegetals}
      population={habitat.population}
      onChange={population => updateHabitat({ ...habitat, population })}
    />
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`
