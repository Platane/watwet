import { h, Component } from 'preact'
import styled from 'preact-emotion'

const Site = ({ info }) => <SiteContainer>{info.name}</SiteContainer>

export const SiteList = ({ sites }) => (
  <Container>{sites.map(site => <Site key={site.id} {...site} />)}</Container>
)

const SiteContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`

const Container = styled.div``
