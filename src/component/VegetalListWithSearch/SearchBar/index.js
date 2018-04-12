import { h, Component } from 'preact'
import styled, { css } from 'preact-emotion'
import { injectFilterState, Typeahead } from 'react-simplest-typeahead'
import { Drop } from '~/component/Icon/Drop'
import { water } from '~/component/_abstract/palette'
import { normalize, splitWithPattern } from '~/util/textSearch'

const filterFunction = pattern => {
  const p = normalize(pattern)

  return vegetal =>
    normalize(vegetal.name_la).includes(p) ||
    normalize(vegetal.name_fr).includes(p)
}

const renderOption = pattern => ({ option, isHighlighted, ...props }) => (
  <Item key={option.id} {...props} isHighlighted={isHighlighted}>
    <Left>{option.wet && <DropIcon color={water} />}</Left>
    <Rigth>
      <NameLa>
        {splitWithPattern(option.name_la, pattern).map(({ text, type }) => (
          <Text type={type}>{text}</Text>
        ))}
      </NameLa>
      <NameFr>
        {splitWithPattern(option.name_fr, pattern).map(({ text, type }) => (
          <Text type={type}>{text}</Text>
        ))}
      </NameFr>
    </Rigth>
  </Item>
)

const DropIcon = styled(Drop)`
  width: 16px;
  height: 16px;
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 16px;
  margin-right: 8px;
  margin-left: 4px;
`
const Rigth = styled.div`
  display: flex;
  flex-direction: column;
`

const Text = styled.span`
  color: ${props => (props.type === 'match' ? '#000' : '#555')};
  font-weight: ${props => (props.type === 'match' ? 'bold' : 'normal')};
`
const NameLa = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
const NameFr = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-style: italic;
  opacity: 0.8;
  margin-left: 8px;
`

const Item = styled.div`
  padding: 4px;
  background-color: ${props => (props.isHighlighted ? '#eee' : 'transparent')};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
`

const SearchBar_ = ({ pattern, ...props }) => (
  <Typeahead
    pattern={pattern}
    value=""
    renderOption={renderOption(pattern)}
    placeholder="your favorite vegetal here ..."
    customClassName={customClassName}
    {...props}
  />
)

const customClassName = {
  input: css`
    padding: 14px 20px;
    border: none;
    border-radius: 2px;
  `,
  options: css``,
  typeahead: css``,
}

export const SearchBar = injectFilterState({
  filter: filterFunction,
  maxDisplayed: 12,
})(SearchBar_)
