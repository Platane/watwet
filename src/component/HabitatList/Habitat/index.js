import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { Image } from '~/component/Image'

export const Habitat = ({ info, population, onClick }) => (
  <Container onClick={onClick}>
    <Picture src={info.picture_url} size="small" />
    <Content>
      <Name>{info.name}</Name>
      <VegetalCount>{`${population.length} species`}</VegetalCount>
    </Content>
  </Container>
)

const Picture = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  flex-shrink: 0;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
  min-width: 300px;
  cursor: pointer;
`
const Content = styled.section`
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Name = styled.div`
  margin-right: 20px;
`
const VegetalCount = styled.div`
  font-size: 0.8em;
  margin-left: auto;
`
