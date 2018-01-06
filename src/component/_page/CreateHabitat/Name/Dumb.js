import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { SearchBar } from './SearchBar'

export const Name = ({
  name,
  localisation,
  description,
  codeCorineBiotipe,
  canonicalName,
  habitatNameDictionary,
  onChange,
}) => (
  <Container>
    <SearchBar
      options={habitatNameDictionary}
      onChange={x =>
        onChange({
          name: x.name,
          canonicalName: x.name,
          codeCorineBiotipe: x.codeCorineBiotipe,
        })
      }
      value={
        (codeCorineBiotipe ? codeCorineBiotipe + '  ' : '') +
        (canonicalName || name || '')
      }
    />
    <input
      type="text"
      value={name}
      onChange={e => onChange({ name: e.target.value })}
    />
    <textarea
      value={description}
      placeholder="description"
      onChange={e => onChange({ description: e.target.value })}
      style={{ resize: 'none' }}
    />
    <textarea
      value={localisation}
      placeholder="localisation"
      onChange={e => onChange({ localisation: e.target.value })}
      style={{ resize: 'none' }}
    />
  </Container>
)

const Container = styled.div`
  background-color: #eee;
  margin: 10px;
`
