import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { set } from '~/util/reduxHelper'
import { LayerBadge as LayerBadge_ } from '~/component/LayerBadge'
import { clampU } from '~/util/math'

export const VegetalList = ({
  population,
  onRemove,
  onChangeRepresentation,
}) => (
  <Container style={{ height: `${population.length * 50}px` }}>
    {population.map(({ layer, vegetal, representation }, i) => (
      <RowContainer
        key={vegetal.id}
        style={{ transform: `translateY(${i * 50}px)` }}
      >
        <Row key={vegetal.id}>
          <LayerBadge size={30} layer={layer} />

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
      </RowContainer>
    ))}
  </Container>
)

const Container = styled.div`
  position: relative;
`
const LayerBadge = styled(LayerBadge_)`
  flex-shrink: 0;
`

const popAnimation = keyframes`
  0%{ transform: scale(0.92,0.92); opacity:0}
  50%{ transform: scale(1.02,1.02); opacity:1}
  100%{ transform: scale(1,1); opacity:1}
`

const RowContainer = styled.div`
  transition: transform 260ms ease;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
`
const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  animation: ${popAnimation} 260ms linear;
`

const RemoveButton = styled.div`
  cursor: pointer;
  margin-right: 10px;
`

const Name = styled.div`
  margin: 0 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
