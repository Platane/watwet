import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { HabitatHeader } from '~/component/HabitatHeader'
import { LayerSelector } from '~/component/LayerSelector'
import { VegetalListWithSearch } from '~/component/VegetalListWithSearch'
import { filterPopulation } from '~/store/selector/currentLayer'

export const Habitat = ({
  currentLayer,
  habitat,
  layers,
  vegetals,
  updateHabitat,
  selectLayer,
}) => (
  <Container>
    <HabitatHeader habitat={habitat} />
    <Content>
      <LayerSelector
        currentLayer={currentLayer}
        layers={layers}
        onSelect={selectLayer}
      />

      <div style={{ height: '64px', width: '32px' }} />

      <VegetalListWithSearch
        currentLayer={currentLayer}
        vegetals={vegetals}
        population={habitat.population.filter(filterPopulation(currentLayer))}
        population_unfilter={habitat.population}
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
  display: flex;
  flex-direction: row;
  width: calc(100% - 32px);
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 800px) {
    align-items: center;
    min-height: 600px;
    max-width: 480px;
    flex-direction: column;
  }
`
