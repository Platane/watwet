import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { HabitatList as List } from '~/component/HabitatList'
import { Link } from '~/component/Link'
import { variant, white } from '~/component/_abstract/palette'

export const HabitatList = ({ siteId, habitats }) => (
  <Container>
    {habitats && <List siteId={siteId} habitats={habitats} />}

    {habitats && habitats.length == 0 && 'there is no habitat for this site'}

    <Link href={`/site/${siteId}/habitat/create`}>
      <AddButton />
    </Link>
  </Container>
)

const AddButton = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: fixed;

  bottom: 70px;
  right: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${variant[3]};
  color: ${white};
  font-size: 40px;
  box-shadow: 2px 1px 4px 0px rgba(0, 0, 0, 0.3);

  &::after {
    content: '+';
  }
`
const Container = styled.div`
  z-index: 2;
  position: relative;
  max-width: 800px;
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  flex: 100px 1 1;
`
