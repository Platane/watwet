import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { grey, vibrant } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'
import { Name } from '../CreateHabitat/Name'
import {
  Container,
  PageTitle,
  InputText,
  InputImage,
  Separator,
  Textarea,
  SubmitButton,
  RemoveButton,
  A,
} from '~/component/Form/index'
import { AppearAnimation } from '~/component/AppearAnimation'

export const EditHabitat = ({
  info,
  habitat,
  onChange,
  onSubmit,
  onRemove,
  onStartUpload,
}) => (
  <Container>
    <AppearAnimation n={0}>
      <PageTitle>{`Edit habitat ${info.name || '-'}`}</PageTitle>
    </AppearAnimation>

    <Separator />

    <AppearAnimation n={0.5}>
      <InputImage
        onStartUpload={onStartUpload}
        onChange={picture_url => onChange({ picture_url })}
        value={info.picture_url}
      />
    </AppearAnimation>

    <Separator />

    <AppearAnimation n={1}>
      <Name {...info} onChange={onChange} />
    </AppearAnimation>

    <form onSubmit={onSubmit}>
      <Separator />

      <AppearAnimation n={1.5}>
        <InputText
          type="text"
          placeholder="displayed name"
          value={info.name}
          onInput={e => onChange({ name: e.target.value })}
        />
      </AppearAnimation>

      <Separator />

      <AppearAnimation n={2}>
        <Textarea
          value={info.description}
          placeholder="description"
          onInput={e => onChange({ description: e.target.value })}
        />
      </AppearAnimation>

      <Separator />

      <AppearAnimation n={2.5}>
        <Textarea
          value={info.location}
          placeholder="location"
          onInput={e => onChange({ location: e.target.value })}
        />
      </AppearAnimation>

      <Separator />

      <AppearAnimation n={3} type="fade">
        <ActionRow>
          {onSubmit && <SubmitButton type="submit">Save</SubmitButton>}
          {onRemove && (
            <RemoveButton type="button" onClick={onRemove}>
              Remove
            </RemoveButton>
          )}
        </ActionRow>
      </AppearAnimation>
    </form>

    <Separator />

    {habitat && (
      <Link href={`/site/${habitat.siteId}/habitat/${habitat.id}`}>
        <A>back to habitat {habitat.name}</A>
      </Link>
    )}
  </Container>
)

const ActionRow = styled.div`
  display: flex;
  flex-direction: row;
`
