import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { set } from '~/util/reduxHelper'
import { LayerBadge } from '~/component/LayerBadge'
import { clampU } from '~/util/math'

const sortFn = (a, b) => (a.representation < b.representation ? 1 : -1)

export const VegetalList = ({
  population,
  onRemove,
  onChangeRepresentation,
}) => (
  <Container>
    {population
      .slice()
      .sort(sortFn)
      .map(({ vegetal, representation }, i) => (
        <Row key={vegetal.id}>
          <LayerBadge size={30} layer={vegetal.layer} />

          <Name>{vegetal.name_la}</Name>

          <Input
            type="number"
            value={Math.round(representation * 100)}
            onBlur={e =>
              onChangeRepresentation(vegetal.id, clampU(e.target.value / 100))
            }
          />

          <RemoveButton onClick={() => onRemove(vegetal.id)}>×</RemoveButton>
        </Row>
      ))}
  </Container>
)

const Container = styled.div``

const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`

const RemoveButton = styled.div`
  cursor: pointer;
  margin-right: 10px;
`

const Name = styled.div`
  margin: 0 20px;
`

const Input = styled.input`
  margin-left: auto;
  height: 30px;
  width: 60px;
  padding: 6px;
  border-radius: 2px;
  border: none;
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 260ms ease;
  &:focus {
    background-color: rgba(255, 255, 255, 0.16);
  }
`
