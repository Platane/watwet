import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { Habitat } from './Habitat'
import { Link } from '~/component/Link'

export const HabitatList = ({ siteId, habitats }) => (
  <Container>
    {habitats.map(habitat => (
      <Link key={habitat.id} href={`/site/${siteId}/habitat/${habitat.id}`}>
        <Habitat {...habitat} />
      </Link>
    ))}
  </Container>
)

const Container = styled.div`
  width: 100%;
`
