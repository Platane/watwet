import { h, Component } from 'preact'
import styled, { css } from 'preact-emotion'
import { injectFilterState, Typeahead } from 'react-simplest-typeahead'
import { Layer as IconLayer_ } from '~/component/Icon/Layer'

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
    <IconLayer layer={option.layer} />
    <Name>
      {exposePattern(option.name_la, pattern).map(({ text, type }) => (
        <Text type={type}>{text}</Text>
      ))}
    </Name>
  </Item>
)
const IconLayer = styled(IconLayer_)`
  margin-right: 20px;
  width: 16px;
  height: 16px;
`

const Text = styled.span`
  color: ${props => (props.type === 'match' ? '#000' : '#555')};
  font-weight: ${props => (props.type === 'match' ? 'bold' : 'normal')};
`
const Name = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Item = styled.div`
  padding: 10px;
  background-color: ${props => (props.isHighlighted ? '#eee' : 'transparent')};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
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
