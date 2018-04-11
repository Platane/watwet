import { h, Component } from 'preact'
import styled, { css } from 'preact-emotion'
import { injectFilterState, Typeahead } from 'react-simplest-typeahead'
import { Drop } from '~/component/Icon/Drop'
import { water } from '~/component/_abstract/palette'
import deburr from 'lodash.deburr'

const filterFunction = pattern => {
  const p = deburr(pattern.toLowerCase())

  return vegetal =>
    deburr(vegetal.name_la.toLowerCase()).includes(p) ||
    deburr(vegetal.name_fr.toLowerCase()).includes(p)
}

const exposePattern = (word, pattern) => {
  if (!pattern) return [{ text: word, type: 'normal' }]

  let s = 0
  let i

  const e = []

  const p = deburr(pattern.toLowerCase())
  const w = deburr(word.toLowerCase())

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
    <Left>{option.wet && <DropIcon color={water} />}</Left>
    <Rigth>
      <NameLa>
        {exposePattern(option.name_la, pattern).map(({ text, type }) => (
          <Text type={type}>{text}</Text>
        ))}
      </NameLa>
      <NameFr>
        {exposePattern(option.name_fr, pattern).map(({ text, type }) => (
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
