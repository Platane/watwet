import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { InputImage } from '~/component/InputImage'
import { Name } from './Name'

export const CreateHabitat = ({ info, onChange, onSubmit }) => (
  <Container>
    <InputImage
      onChange={picture_url => onChange({ ...info, picture_url })}
      value={info.picture_url}
    />

    <Name {...info} onChange={onChange} />

    <SubmitButton onClick={onSubmit}>Create</SubmitButton>
  </Container>
)

const SubmitButton = styled.button`
  padding: 20px;
`

const Container = styled.div`
  z-index: 2;
  position: relative;
  background-color: #eee;
  margin: 10px;
`
