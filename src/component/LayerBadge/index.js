import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { white, trio } from '~/component/_abstract/palette'
import { Layer as LayerIcon } from '~/component/Icon/Layer'

export const LayerBadge = ({ size, layer, color1, color2, ...props }) => (
  <IconWrapper {...props} style={{ width: size + 'px', height: size + 'px' }}>
    <LayerIcon
      layer={layer}
      color1={color1}
      color2={color2}
      style={{ width: size * 0.54 + 'px', height: size * 0.54 + 'px' }}
    />
  </IconWrapper>
)

const IconWrapper = styled.div`
  border-radius: 50%;
  background-color: ${white};
  display: flex;
  align-items: center;
  justify-content: center;
`
