import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { variant, white } from '~/component/_abstract/palette'
import { Card } from './Card'

export const SiteList = ({ sites, goToSite, goToCreateSite }) => (
  <Container>
    {sites.map(site => (
      <Site key={site.id} site={site} onClick={goToSite(site)} />
    ))}

    <AddButton onClick={goToCreateSite} />
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
  margin: 20px;
  flex: 100px 1 1;
`

const Site = styled(Card)`
  margin: 20px 0;
  cursor: pointer;
`
