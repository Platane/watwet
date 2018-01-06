import { h } from 'preact'
import styled from 'preact-emotion'
import { white } from '~/component/_abstract/palette'

export const DropDown = ({
  open,
  close,
  opened,
  children,
  inside,
  ...props
}) => (
  <Body tabIndex="0" {...props} onClick={open} onBlur={close}>
    {children}
    {opened && (
      <PanelWrapper>
        <Panel>{h(inside)}</Panel>
      </PanelWrapper>
    )}
  </Body>
)

const Body = styled.div`
  outline-color: transparent;
`
const PanelWrapper = styled.div`
  position: relative;
`
const Panel = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  background-color: ${white};
  box-shadow: 2px 1px 4px 0px rgba(0, 0, 0, 0.3);
  border-radius: 2px;

  &::after {
    content: '';
    border-bottom: solid 5px ${white};
    border-left: solid 5px transparent;
    border-right: solid 5px transparent;
    position: absolute;
    top: -5px;
    right: 10px;
  }
`
