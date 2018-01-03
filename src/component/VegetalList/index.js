import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { set } from '~/util/reduxHelper'

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
          <Name>{vegetal.name_la}</Name>

          <Representation
            type="text"
            value={Math.round(representation * 100)}
            onChange={e =>
              onChangeRepresentation(vegetal.id, e.target.value / 100)
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
  padding: 10px 0;
`

const RemoveButton = styled.div``

const Name = styled.div``

const Representation = styled.input``
