import { h, Component } from 'preact'
import styled, { keyframes, css } from 'preact-emotion'
import { white, trio } from '~/component/_abstract/palette'
import { LayerBadge as LayerBadge_ } from '~/component/LayerBadge'
import { clampU } from '~/util/math'

const layerLabels = [
  { key: 'A', color: trio[2], label: 'arborée' },
  { key: 'a', color: trio[1], label: 'arbustif' },
  { key: 'h', color: trio[0], label: 'herbacé' },
]

export const LayerSelector = ({ currentLayer, layers, onChange, onSelect }) => (
  <Container>
    {layerLabels.map(({ key, label, color }) => (
      <Layer key={key}>
        <Left onClick={() => onSelect(currentLayer == key ? null : key)}>
          <Label>{label}</Label>
          <LayerBadge
            selected={currentLayer == key}
            size={30}
            layer={key}
            color1={color}
            color2={color}
          />
        </Left>
        <Rigth>
          <Bar
            selected={currentLayer == key}
            style={{ width: `${100 * layers[key]}px`, backgroundColor: color }}
          />
          <Input
            type="number"
            value={Math.round(layers[key] * 100)}
            step={1}
            onChange={e =>
              onChange({ ...layers, [key]: clampU(e.target.value / 100) })
            }
          />
        </Rigth>
      </Layer>
    ))}
  </Container>
)

const LayerBadge = styled(LayerBadge_)`
  transition: transform 260ms ease;
  transform: ${props => (props.selected ? 'scale(1.3,1.3)' : 'scale(1,1)')};
`

const Container = styled.div`
  position: relative;
`
const Label = styled.div`
  position: relative;
  text-align: right;
  min-width: 80px;
  margin-right: 20px;
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
`
const Input = styled.input`
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
