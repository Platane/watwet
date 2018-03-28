import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { HabitatHeader } from '~/component/HabitatHeader'
import { LayerSelector } from '~/component/LayerSelector'
import { VegetalListWithSearch } from '~/component/VegetalListWithSearch'
import { filterVegetal } from '~/store/selector/currentLayer'

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

      <div style={{ height: '60px' }} />

      <VegetalListWithSearch
        currentLayer={currentLayer}
        vegetals={vegetals.filter(filterVegetal(currentLayer))}
        population={habitat.population.filter(x =>
          filterVegetal(currentLayer)(x.vegetal)
        )}
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
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 480px;
  margin: 20px;
  min-height: 600px;
`
