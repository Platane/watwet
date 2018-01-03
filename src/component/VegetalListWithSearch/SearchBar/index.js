import { h, Component } from 'preact'
import styled, { css } from 'preact-emotion'
import { injectFilterState, Typeahead } from 'react-simplest-typeahead'

const filterFunction = pattern => vegetal =>
  vegetal.name_la.toLowerCase().includes(pattern.toLowerCase())

const exposePattern = (word, pattern) => {
  if (!pattern) return [{ text: word, type: 'normal' }]

  let s = 0
  let i

  const e = []

  const p = pattern.toLowerCase()
  const w = word.toLowerCase()

  while ((i = w.indexOf(p, s)) >= 0) {
    const pre = word.slice(s, i)

    s = i + p.length

    const pa = word.slice(i, s)

    e.push({ text: pre, type: 'normal' }, { text: pa, type: 'match' })
  }

  e.push({ text: word.slice(s), type: 'normal' })

  return e
}

const renderOption = pattern => ({ option, isHighlighted, ...props }) => (
  <Item key={option.id} {...props} isHighlighted={isHighlighted}>
    {exposePattern(option.name_la, pattern).map(({ text, type }) => (
      <Text type={type}>{text}</Text>
    ))}
  </Item>
)

const Text = styled.span`
  color: ${props => (props.type === 'match' ? '#000' : '#555')};
  font-weight: ${props => (props.type === 'match' ? 'bold' : 'normal')};
`

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
    placeholder="your favorite vegetal here ..."
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
  maxDisplayed: 6,
})(SearchBar_)
