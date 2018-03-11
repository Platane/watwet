import { h, Component } from 'preact'
import styled, { css } from 'preact-emotion'
import { SearchBar } from './SearchBar'
import { VegetalList } from '../VegetalList'

export const VegetalListWithSearch = ({
  options,
  population,
  onRemove,
  onAdd,
  onChangeRepresentation,
}) => (
  <Container>
    <SearchBar onChange={onAdd} options={options} />

    <div style={{ height: '20px' }} />

    <VegetalList
      population={population}
      onRemove={onRemove}
      onChangeRepresentation={onChangeRepresentation}
    />
  </Container>
)

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`
