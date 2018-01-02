import { h, Component } from 'preact'
import styled from 'preact-emotion'

const Site = ({ info, onClick }) => (
  <SiteContainer onClick={onClick}>{info.name}</SiteContainer>
)

export const SiteList = ({ sites, onClickSite }) => (
  <Container>
    {sites.map(site => (
      <Site
        key={site.id}
        {...site}
        onClick={onClickSite && (() => onClickSite(site))}
      />
    ))}
  </Container>
)

const SiteContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`

const Container = styled.div``
