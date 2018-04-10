import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { grey, vibrant } from '~/component/_abstract/palette'
import { InputImage as InputImage_ } from '~/component/InputImage'
import { Name } from './Name'

export const CreateHabitat = ({
  info,
  site,
  onChange,
  onSubmit,
  onStartUpload,
}) => (
  <Container>
    <PageTitle>{`Create new habitat in ${(site && site.name) ||
      '-'}`}</PageTitle>

    <Separator />

    <InputImage
      onStartUpload={onStartUpload}
      onChange={picture_url => onChange({ picture_url })}
      value={info.picture_url}
    />

    <Separator />

    <Name {...info} onChange={onChange} />

    <form onSubmit={onSubmit}>
      <Separator />

      <Input
        type="text"
        placeholder="displayed name"
        value={info.name}
        onInput={e => onChange({ name: e.target.value })}
      />

      <Separator />

      <Textarea
        value={info.description}
        placeholder="description"
        onInput={e => onChange({ description: e.target.value })}
      />

      <Separator />

      <Textarea
        value={info.location}
        placeholder="location"
        onInput={e => onChange({ location: e.target.value })}
      />

      <Separator />

      {onSubmit && <SubmitButton type="submit">Create</SubmitButton>}
    </form>
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

const InputImage = styled(InputImage_)`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  background-color: ${vibrant[1]};
  border: solid 4px #fff;
  overflow: hidden;
  flex-shrink: 0;
  margin: 0 auto;
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

const Container = styled.div`
  z-index: 2;
  position: relative;
  margin: 20px auto;
  max-width: 800px;
  width: calc(100% - 40px);
`
