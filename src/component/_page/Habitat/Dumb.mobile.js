import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { HabitatHeader } from '~/component/HabitatHeader'
import { LayerSelector } from '~/component/LayerSelector'
import { VegetalListWithSearch } from '~/component/VegetalListWithSearch'

export const Habitat = ({ habitat, vegetals, updateHabitat }) => (
  <Container>
    <HabitatHeader habitat={habitat} />
    <Content>
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
    </Content>
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Content = styled.div`
  margin: 20px;
`
