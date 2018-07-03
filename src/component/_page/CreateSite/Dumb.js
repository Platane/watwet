import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import {
  Container,
  PageTitle,
  InputText,
  InputImage,
  Separator,
  Textarea,
  SubmitButton,
} from '~/component/Form/index'
import { vibrant } from '~/component/_abstract/palette'
import { AppearAnimation } from '~/component/AppearAnimation'

export const CreateSite = ({ name, description, onChange, onSubmit }) => (
  <Container>
    <Background />

    <AppearAnimation n={1}>
      <PageTitle>Create new site</PageTitle>
    </AppearAnimation>

    <Separator />

    <AppearAnimation n={1.5}>
      <InputText
        type="text"
        placeholder="name"
        value={name}
        onInput={e => onChange({ name: e.target.value })}
      />
    </AppearAnimation>

    <Separator />

    <AppearAnimation n={2}>
      <Textarea
        value={description}
        placeholder="description"
        onChange={e => onChange({ description: e.target.value })}
      />
    </AppearAnimation>

    <Separator />

    {onSubmit && <SubmitButton onClick={onSubmit}>Create</SubmitButton>}
  </Container>
)

const backgroundAnimation = keyframes`
  0%{
    transform: scale(0.9,0.9);
  }
  100%{
    transform: scale(50,50);
  }
`

export const Background = styled.div`
  z-index: -1;
  background-color: ${vibrant[2]};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: fixed;
  bottom: 70px;
  right: 50px;
  box-shadow: 2px 1px 4px 0px rgba(0, 0, 0, 0.3);
  animation: ${backgroundAnimation} 300ms linear;
  transform: scale(999, 999);
`
