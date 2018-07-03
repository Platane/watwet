import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { grey, vibrant } from '~/component/_abstract/palette'
import { InputImage as InputImage_ } from '~/component/InputImage'
import { Name } from './Name'
import { AppearAnimation } from '~/component/AppearAnimation'
import {
  Container,
  PageTitle,
  InputText,
  InputImage,
  Separator,
  Textarea,
  SubmitButton,
} from '~/component/Form/index'

export const CreateHabitat = ({
  info,
  site,
  onChange,
  onSubmit,
  onStartUpload,
}) => (
  <Container>
    <Background />

    <AppearAnimation n={1}>
      <PageTitle>{`Create new habitat in ${(site && site.name) ||
        '-'}`}</PageTitle>
    </AppearAnimation>

    <Separator />

    <AppearAnimation n={1.5}>
      <InputImage
        onStartUpload={onStartUpload}
        onChange={picture_url => onChange({ picture_url })}
        value={info.picture_url}
      />
    </AppearAnimation>

    <Separator />

    <AppearAnimation n={2}>
      <Name {...info} onChange={onChange} />
    </AppearAnimation>

    <form onSubmit={onSubmit}>
      <Separator />

      <AppearAnimation n={2.5}>
        <InputText
          type="text"
          placeholder="displayed name"
          value={info.name}
          onInput={e => onChange({ name: e.target.value })}
        />
      </AppearAnimation>

      <Separator />

      <AppearAnimation n={3}>
        <Textarea
          value={info.description}
          placeholder="description"
          onInput={e => onChange({ description: e.target.value })}
        />
      </AppearAnimation>

      <Separator />

      <AppearAnimation n={3.5}>
        <Textarea
          value={info.location}
          placeholder="location"
          onInput={e => onChange({ location: e.target.value })}
        />
      </AppearAnimation>

      <Separator />

      {onSubmit && <SubmitButton type="submit">Create</SubmitButton>}
    </form>
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
  background-color: ${vibrant[3]};
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
