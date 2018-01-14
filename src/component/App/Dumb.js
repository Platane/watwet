import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { RepartitionBar } from '~/component/RepartitionBar'
import { Header } from '~/component/Header'
import { CreateHabitat } from '~/component/_page/CreateHabitat'
import { HabitatList } from '~/component/_page/HabitatList'
import { Habitat } from '~/component/_page/Habitat'
import { variant } from '~/component/_abstract/palette'
import cssReset from '../_abstract/cssReset'
import * as palette from '../_abstract/palette'

export const Content = ({ routerKey, routerParam }) => {
  switch (routerKey) {
    case 'habitatCreate':
      return <CreateHabitat />

    case 'habitatList':
      return <HabitatList />

    case 'habitat':
      return <Habitat />

    default:
      return null
  }
}

const Palette = () => (
  <div style={{ position: 'fixed', bottom: 0, right: 0 }}>
    <div>
      <Square color={palette.white} />
      <Square color={palette.grey} />
      <Square color={palette.black} />
      <Square color={palette.vibrant1} />
      <Square color={palette.vibrant2} />
    </div>
    <div>{palette.trio.map(c => <Square color={c} />)}</div>
    <div>{palette.variant.map(c => <Square color={c} />)}</div>
    <div>
      {['asdas', 'sdsa', '213a', '213b', '213c'].map(c => (
        <Square color={palette.fromHash(c)} />
      ))}
    </div>
  </div>
)
const Square = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
`

export const App = ({ routerKey, routerParam }) =>
  cssReset() || (
    <Container>
      <Header />
      <Palette />
      <ContentWrap routerKey={routerKey}>
        <Content routerKey={routerKey} routerParam={routerParam} />
      </ContentWrap>
      <Footer />
    </Container>
  )

const back_color = {
  home: variant[0],
  habitatCreate: variant[3],
  habitatList: variant[0],
  habitat: variant[1],
}
const ContentWrap = styled.div`
  background-color: ${props => back_color[props.routerKey]};
  transition: background-color 280ms ease;
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
