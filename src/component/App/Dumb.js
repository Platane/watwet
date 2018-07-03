import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { RepartitionBar } from '~/component/RepartitionBar'
import { Header } from '~/component/Header'
import { Footer } from '~/component/Footer'
import { ToastZone } from '~/component/ToastZone'
import { Wallpaper } from '~/component/Wallpaper'
import { CreateHabitat } from '~/component/_page/CreateHabitat'
import { EditHabitat } from '~/component/_page/EditHabitat'
import { CreateSite } from '~/component/_page/CreateSite'
import { HabitatList } from '~/component/_page/HabitatList'
import { SiteList } from '~/component/_page/SiteList'
import { Setting } from '~/component/_page/Setting'
import { Habitat } from '~/component/_page/Habitat'
import { Login } from '~/component/_page/Login'

export const Content = ({ anonym, routerKey, routerParam }) => {
  if (anonym) return <Login />

  switch (routerKey) {
    case 'setting':
      return <Setting />

    case 'siteList':
      return <SiteList />

    case 'siteCreate':
      return <CreateSite />

    case 'habitatCreate':
      return <CreateHabitat />

    case 'habitatEdit':
      return <EditHabitat />

    case 'habitatList':
      return <HabitatList />

    case 'habitat':
      return <Habitat />

    default:
      return null
  }
}

export const App = props => (
  <Container>
    {!props.anonym && <Header />}
    <ContentWrap>
      <Wallpaper />
      <Content {...props} />
    </ContentWrap>
    <Footer />
    <ToastZone />
  </Container>
)

const ContentWrap = styled.div`
  flex: 0px 1 1;
  position: relative;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: hidden;
`
