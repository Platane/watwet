import { h, Component } from 'preact'
import styled, { css } from 'preact-emotion'

import { SearchBar } from './SearchBar'

export const Name = ({
  name,
  codeCorineBiotipe,
  canonicalName,
  habitatNameDictionary,
  onChange,
}) => (
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
)
