import styled from 'preact-emotion'
import { h, Component } from 'preact'
import { white, grey } from '~/component/_abstract/palette'
import { Github } from '~/component/Icon/Github'
import { Link } from '~/component/Link'

export const Footer = () => (
  <Container>
    <Center>
      <Label>made by </Label>

      <Link target="blank" href="https://twitter.com/platane_">
        <A>@platane</A>
      </Link>

      <Separator />

      <Link target="blank" href="https://github.com/platane/watwet">
        <A>
          <GithubIcon color={white} />
        </A>
      </Link>
    </Center>
  </Container>
)

const A = styled.a`
  text-decoration: none;

  transition: transform 100ms ease;

  color: inherit;

  &:visited {
    color: inherit;
  }

  &:active {
    color: inherit;
    transform: scale(0.98, 0.98);
  }
`

const Separator = styled.div`
  width: 16px;
  height: 16px;
`

const Label = styled.span`
  white-space: nowrap;
  margin-right: 8px;
`

const GithubIcon = styled(Github)`
  width: 16px;
  height: 16px;
`

const Center = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
  max-width: 400px;
  margin: 0 auto;
`

const Container = styled.footer`
  background-color: ${grey};
  color: #aaa;
  width: 100%;
`
