import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'

export const CreateSite = ({ name, description, onChange, onSubmit }) => (
  <Container>
    <PageTitle>Create new site</PageTitle>

    <Separator />

    <Input
      type="text"
      placeholder="name"
      value={name}
      onInput={e => onChange({ name: e.target.value })}
    />

    <Separator />

    <Textarea
      value={description}
      placeholder="description"
      onChange={e => onChange({ description: e.target.value })}
    />

    <Separator />

    {onSubmit && <SubmitButton onClick={onSubmit}>Create</SubmitButton>}
  </Container>
)

const PageTitle = styled.h1``

const Separator = styled.div`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`

const Input = styled.input`
  padding: 14px 20px;
  border: none;
  border-radius: 2px;
  width: 100%;
`

const Textarea = styled.textarea`
  padding: 14px 20px;
  width: 100%;
  height: 80px;
  border-radius: 2px;
  border: none;
  background-color: #fff;
  transition: background-color 260ms ease;
  resize: none;
`

const pop = keyframes`
  0%{opacity:0; transform: translateY(40px)}
  100%{opacity:1; transform: translateY(0)}
`

const SubmitButton = styled.button`
  animation: ${pop} 180ms ease;
  padding: 20px;
`

const Container = styled.form`
  z-index: 2;
  position: relative;
  margin: 20px auto;
  max-width: 800px;
  width: calc(100% - 40px);
`
