import { h, Component } from 'preact'
import styled, { css } from 'preact-emotion'
import { injectFilterState, Typeahead } from 'react-simplest-typeahead'
import { normalize, splitWithPattern } from '~/util/textSearch'

const filterFunction = pattern => ({ normalizedName, id }) =>
  normalizedName.includes(normalize(pattern)) || id.includes(normalize(pattern))

const renderOption = pattern => ({ option, isHighlighted, ...props }) => (
  <Item key={option.id} {...props} isHighlighted={isHighlighted}>
    <Code>
      {splitWithPattern(option.id, pattern).map(({ text, type }) => (
        <Text type={type}>{text}</Text>
      ))}
    </Code>
    <Name>
      {splitWithPattern(option.name, pattern).map(({ text, type }) => (
        <Text type={type}>{text}</Text>
      ))}
    </Name>
  </Item>
)

const Text = styled.span`
  color: ${props => (props.type === 'match' ? '#000' : '#555')};
  font-weight: ${props => (props.type === 'match' ? 'bold' : 'normal')};
`

const Code = styled.span`
  min-width: 100px;
  display: inline-block;
`
const Name = styled.span``

const Item = styled.div`
  padding: 10px;
  background-color: ${props => (props.isHighlighted ? '#eee' : 'transparent')};
  cursor: pointer;
`

const SearchBar_ = ({ pattern, ...props }) => (
  <Typeahead
    pattern={pattern}
    value=""
    renderOption={renderOption(pattern)}
    placeholder="habitat name"
    cusmtomClassName={cusmtomClassName}
    {...props}
  />
)

const cusmtomClassName = {
  input: css``,
  options: css``,
  typeahead: css``,
}

export const SearchBar = injectFilterState({
  filter: filterFunction,
  maxDisplayed: 12,
})(SearchBar_)
