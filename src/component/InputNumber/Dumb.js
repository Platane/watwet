import { h } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { white, vibrant } from '~/component/_abstract/palette'

export const InputNumber = ({
  value,
  opened,

  availableValues,

  onInput,
  onKeyDown,
  onFocus,
  onBlur,
  onSelect,

  ...props
}) => (
  <Container>
    <Input
      type="number"
      value={value}
      onBlur={onBlur}
      onFocus={onFocus}
      onInput={onInput}
      onKeyDown={onKeyDown}
    />
    {opened && (
      <Panel>
        <div>
          {availableValues.map(v => (
            <Option
              key={v}
              selected={v === value}
              onMouseDown={e => onSelect(v)}
              onTouchStart={e => onSelect(v)}
            >
              {Math.round(v)}
            </Option>
          ))}
        </div>
      </Panel>
    )}
  </Container>
)

const Container = styled.div`
  position: relative;
`

const Panel = styled.div`
  position: absolute;
  background-color: ${white};
  padding: 8px 0;
  min-width: 50px;
  width: 100%;
  z-index: 2;
  border-radius: 0 0 4px 4px;
`

const Option = styled.div`
  padding: 4px 16px;
  font-size: 10px;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#ddd' : white)};
`

const Input = styled.input`
  position: relative;
  height: 30px;
  width: 60px;
  padding: 6px;
  border-radius: 2px;
  border: none;
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 60ms ease;
  &:focus {
    background-color: ${white};
    border-radius: 4px 4px 0 0;
  }
`
