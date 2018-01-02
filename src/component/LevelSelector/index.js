import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { set } from '~/util/reduxHelper'

const Row = ({ label, value, onSelect, onChange }) => (
  <RowContainer>
    <input type="text" value={value} onBlur={e => onChange(e.target.value)} />
    <span>{label}</span>
    <button onClick={onSelect}>select</button>
  </RowContainer>
)

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const LevelSelector = ({ habitat, onHabitatChange, onSelect }) => (
  <Container>
    {['A', 'a', 'h'].map(x => (
      <Row
        key={x}
        label={x}
        value={habitat.levels[x].representation}
        onSelect={() => onSelect(x)}
        onChange={value =>
          onHabitatChange(set(habitat, ['levels', x, 'representation'], value))
        }
      />
    ))}
  </Container>
)

const Container = styled.div``
