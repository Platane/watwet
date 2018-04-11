import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { set } from '~/util/reduxHelper'
import { LayerBadge as LayerBadge_ } from '~/component/LayerBadge'
import { InputNumber } from '~/component/InputNumber'
import { Drop } from '~/component/Icon/Drop'
import { water } from '~/component/_abstract/palette'

export const VegetalList = ({
  population,
  onRemove,
  onChangeRepresentation,
}) => (
  <Container style={{ height: `${population.length * 50}px` }}>
    {population
      .map(({ layer, vegetal, representation }, i) => (
        <RowContainer
          key={vegetal.id}
          style={{ transform: `translateY(${i * 50}px)` }}
        >
          <Row key={vegetal.id}>
            <LayerBadge size={30} layer={layer} />

            {vegetal.wet && <DropIcon color={water} />}

            <Name>{vegetal.name_la}</Name>

            <InputNumber
              onChange={x => onChangeRepresentation(vegetal.id, x)}
              value={representation}
            />

            <RemoveButton onClick={() => onRemove(vegetal.id)}>×</RemoveButton>
          </Row>
        </RowContainer>
      ))
      .reverse()}
  </Container>
)

const DropIcon = styled(Drop)`
  width: 16px;
  height: 16px;
  position: absolute;
  left: 16px;
  top: 22px;
`

const Container = styled.div`
  position: relative;
  margin-bottom: 300px;
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
  margin-left: 10px;
  padding: 4px;
`

const Name = styled.div`
  margin: 0 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-right: auto;
`
