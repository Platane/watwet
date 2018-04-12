import { h, Component } from 'preact'
import styled, { css } from 'preact-emotion'
import { injectFilterState, Typeahead } from 'react-simplest-typeahead'
import { normalize, splitWithPattern } from '~/util/textSearch'
import { Drop } from '~/component/Icon/Drop'
import { water } from '~/component/_abstract/palette'

// b prefix a
const prefix = (a, b) => a.slice(0, b.length) === b

const filterFunction = pattern => ({ normalizedName, codeCorineBiotipe }) =>
  normalizedName.includes(normalize(pattern)) ||
  prefix(codeCorineBiotipe, normalize(pattern))

const TypeaheadFiltered = injectFilterState({
  filter: filterFunction,
  maxDisplayed: 12,
})(Typeahead)

const renderOption = ({ pattern, option, isHighlighted, ...props }) => (
  <Item key={option.id} {...props} isHighlighted={isHighlighted}>
    <Left>{option.wet && <DropIcon color={water} />}</Left>

    <Code>
      {splitWithPattern(option.codeCorineBiotipe, pattern).map(
        ({ text, type }) => <Text type={type}>{text}</Text>
      )}
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

const Item = styled.div`
  padding: 10px 4px;
  background-color: ${props => (props.isHighlighted ? '#eee' : 'transparent')};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const SearchBar = ({ value, options, onChange, ...props }) => (
  <TypeaheadFiltered
    value={value}
    options={options}
    onChange={onChange}
    renderOption={renderOption}
    placeholder="canonical name"
    customClassName={customClassName}
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
