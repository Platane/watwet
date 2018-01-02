import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { Habitat } from './Habitat'

export const HabitatList = ({ habitats, onClickHabitat }) => (
  <Container>
    {habitats.map(habitat => (
      <Habitat
        key={habitat.id}
        {...habitat}
        onClick={onClickHabitat && (() => onClickHabitat(habitat))}
      />
    ))}
  </Container>
)

const Container = styled.div``
