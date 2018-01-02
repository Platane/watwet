import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { RepartitionBar } from '~/component/RepartitionBar'
import { Header } from '~/component/Header'
import { SiteList } from '~/component/_page/SiteList'

import cssReset from '../_abstract/cssReset'

export const Content = ({ routerKey, routerParam }) => {
  switch (routerKey) {
    case 'siteList':
      return <SiteList />
    default:
      return null
  }
}

export const App = ({ routerKey, routerParam }) =>
  cssReset() || (
    <Container>
      <Header />
      <ContentWrap>
        <Content routerKey={routerKey} routerParam={routerParam} />
      </ContentWrap>
      <Footer />
    </Container>
  )

const ContentWrap = styled.div`
  flex: 0px 1 1;
`

const Footer = styled.div`
  background-color: #eee;
  height: 30px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`
