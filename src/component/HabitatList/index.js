import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { Habitat } from './Habitat'
import { Link } from '~/component/Link'

export const HabitatList = ({ siteId, habitats }) => (
  <Container>
    {habitats.map(habitat => (
      <Link key={habitat.id} href={`/site/${siteId}/habitat/${habitat.id}`}>
        <A>
          <Habitat {...habitat} />
        </A>
      </Link>
    ))}
  </Container>
)

const A = styled.a`
  text-decoration: none;

  width: 100%;
  transition: transform 100ms ease;

  margin: 20px;

  color: inherit;

  &:visited {
    color: inherit;
  }

  &:active {
    color: inherit;
    transform: scale(0.98, 0.98);
  }
`

const Container = styled.div`
  width: 100%;
`
