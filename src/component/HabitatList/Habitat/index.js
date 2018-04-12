import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { Image } from '~/component/Image'
import { Drop } from '~/component/Icon/Drop'
import { water, white } from '~/component/_abstract/palette'

export const Habitat = ({ info, population, naturalWet, onClick }) => (
  <Container onClick={onClick}>
    <Picture src={info.picture_url} size="small" />
    {naturalWet && (
      <DropIconBadge>
        <DropIcon color={water} />
      </DropIconBadge>
    )}
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

const DropIconBadge = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${white};
  position: absolute;
  left: 40px;
  top: 54px;
`
const DropIcon = styled(Drop)`
  width: 16px;
  height: 16px;
`

const Container = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 300px;
`
const Content = styled.section`
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Name = styled.span`
  margin-right: 20px;
`
const VegetalCount = styled.span`
  font-size: 0.8em;
  margin-left: auto;
`
