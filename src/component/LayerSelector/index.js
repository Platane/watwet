import { h, Component } from 'preact'
import styled, { keyframes, css } from 'preact-emotion'
import { white, trio } from '~/component/_abstract/palette'
import { LayerBadge as LayerBadge_ } from '~/component/LayerBadge'
import { Slidable } from '~/component/_abstract/Slidable'
import { clampU } from '~/util/math'

const layerLabels = [
  { key: 'A', color: trio[2], label: 'arborée' },
  { key: 'a', color: trio[1], label: 'arbustif' },
  { key: 'h', color: trio[0], label: 'herbacé' },
]

const setLayerValue = (onChange, layers, key) => x =>
  onChange({ ...layers, [key]: clampU(x / 100) })

export const LayerSelector = ({ currentLayer, layers, onChange, onSelect }) => (
  <Container>
    {layerLabels.map(({ key, label, color }) => (
      <Layer key={key} onClick={() => onSelect(key)}>
        <Left>
          <Label selected={currentLayer == key}>{label}</Label>
          <LayerBadge
            selected={currentLayer == key}
            size={30}
            layer={key}
            color1={color}
            color2={color}
          />
        </Left>
        <Rigth>
          <BarContainer>
            <Bar
              selected={currentLayer == key}
              style={{
                width: `${100 * clampU(layers[key])}%`,
                backgroundColor: color,
              }}
            />
          </BarContainer>
          <LabelPercent>{Math.round(layers[key] * 100)}</LabelPercent>
        </Rigth>
      </Layer>
    ))}
  </Container>
)

const popAnimation = keyframes`
  0%{ transform: scale(1,1)}
  50%{ transform: scale(1.4,1.4)}
  80%{ transform: scale(1.27,1.27)}
  100%{ transform: scale(1.3,1.3)}
`

const LayerBadge = styled(LayerBadge_)`
  /* transition: transform 260ms ease; */
  transform: ${props => (props.selected ? 'scale(1.3,1.3)' : 'scale(1,1)')};
  animation: ${props => (props.selected ? popAnimation : null)} 260ms;
`

const Container = styled.div`
  position: relative;
`
const Label = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: 20px;
  &::after {
    content: '';
    width: 100%;
    background-color: ${white};
    height: 1px;
    position: absolute;
    opacity: ${props => (props.selected ? 1 : 0)};
    top: 21px;
    left: 0;
    transform: translateY(${props => (props.selected ? 0 : -4)}px);
    transition: opacity 260ms ease, transform 260ms ease;
  }
`
const Layer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`
const Left = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
  min-width: 200px;
`
const Rigth = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 180px;
`
const Bar = styled.div`
  height: 30px;
  margin-right: 2px;
  border: solid 1px ${props => (props.selected ? white : 'transparent')};
  border-radius: 2px;
  transition: border-color 260ms ease;
`
const BarContainer = styled.div`
  width: 100px;
  position: relative;
`
const LabelPercent = styled.span`
  height: 30px;
  width: 60px;
  padding: 6px;
`
