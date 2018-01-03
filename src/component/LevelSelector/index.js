import { h, Component } from 'preact'
import styled from 'preact-emotion'

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

export const LevelSelector = ({ layers, onChange, onSelect }) => (
  <Container>
    {['A', 'a', 'h'].map(x => (
      <Row
        key={x}
        label={x}
        value={layers[x]}
        onSelect={() => onSelect(x)}
        onChange={value => onChange({ ...layers, [x]: value })}
      />
    ))}
  </Container>
)

const Container = styled.div``
