import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { HabitatList as List } from '~/component/HabitatList'
import { white } from '~/component/_abstract/palette'
import { Mosaic as Mosaic_ } from '~/component/Mosaic'

export const Card = ({ site, ...props }) => (
  <Container {...props}>
    <Mosaic srcs={site.habitats.map(x => x.info.picture_url).filter(Boolean)} />
    <Content>
      <Name>{site.name}</Name>
      <Description>{site.name}</Description>
    </Content>
  </Container>
)

const Container = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: row;
  background-color: ${white};
  box-shadow: 2px 1px 4px 0px rgba(0, 0, 0, 0.3);

  transition: transform 100ms ease;

  &:active {
    transform: scale(0.98, 0.98);
  }
`
const Name = styled.h2`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const Description = styled.p``
const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  overflow: hidden;
`
const Mosaic = styled(Mosaic_)`
  flex-shrink: 0;
  height: 160px;
  width: 160px;
  position: relative;
`
