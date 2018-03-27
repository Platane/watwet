import { h, Component } from 'preact'
import styled from 'preact-emotion'

export const CreateSite = ({ info, onChange, onSubmit }) => (
  <Container>
    <Row>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={e => onChange({ name: e.target.value })}
      />

      <input
        type="text"
        placeholder="description"
        value={name}
        onChange={e => onChange({ description: e.target.value })}
      />
    </Row>

    <SubmitButton onClick={onSubmit}>Create</SubmitButton>
  </Container>
)

const SubmitButton = styled.button`
  padding: 20px;
`

const Row = styled.div``

const Container = styled.div`
  z-index: 2;
  position: relative;
  background-color: #eee;
  margin: 10px;
`
