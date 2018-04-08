import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { variant, white } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'
import { Card } from './Card'

export const SiteList = ({ sites }) => (
  <Container>
    {sites.map(site => (
      <Link key={site.id} href={`/site/${site.id}`}>
        <Site key={site.id} site={site} />
      </Link>
    ))}

    <Link href={`/site/create`}>
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
  align-items: flex-start;
  margin: 10px auto;
  flex: 100px 1 1;

  @media (max-width: 600px) {
    width: 100%;
  }
`

const Site = styled(Card)`
  margin: 10px 0;
  cursor: pointer;
`
