import { h, Component } from 'preact'
import styled, { css } from 'preact-emotion'
import { Drop } from '~/component/Icon/Drop'
import { water, white } from '~/component/_abstract/palette'
import { SearchBar } from './SearchBar'

export const Name = ({
  name,
  habitat_byCodeCorindeBiotipe,
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

    {habitat_byCodeCorindeBiotipe[codeCorineBiotipe] &&
      habitat_byCodeCorindeBiotipe[codeCorineBiotipe].wet && (
        <DropIcon color={water} />
      )}
  </Container>
)

const Container = styled.div`
  position: relative;
`

const DropIcon = styled(Drop)`
  position: absolute;
  left: 2px;
  bottom: 13px;
  width: 16px;
  height: 16px;
`
