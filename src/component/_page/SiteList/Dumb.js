import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { SiteList as List } from '~/component/SiteList'

export const SiteList = ({ sites, goToSite }) => (
  <Container>
    {sites && <List onClickSite={goToSite} sites={sites} />}
  </Container>
)

const Container = styled.div`
  max-width: 800px;
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  flex: 100px 1 1;
`
