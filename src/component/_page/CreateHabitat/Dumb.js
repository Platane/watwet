import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { InputImage } from '~/component/InputImage'
import { Name } from './Name'

export const CreateHabitat = ({ info, onChange }) => (
  <Container>
    <InputImage
      onChange={picture_url => onChange({ ...info, picture_url })}
      value={info.picture_url}
    />
    <Name {...info} onChange={onChange} />
  </Container>
)

const Container = styled.div`
  background-color: #eee;
  margin: 10px;
`