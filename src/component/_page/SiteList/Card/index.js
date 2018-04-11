import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { HabitatList as List } from '~/component/HabitatList'
import { white } from '~/component/_abstract/palette'
import { Mosaic as Mosaic_ } from '~/component/Mosaic'
import { TextWithLineBreak } from '~/component/TextWithLineBreak'

export const Card = ({ site, ...props }) => (
  <Container {...props}>
    <Mosaic srcs={site.habitats.map(x => x.info.picture_url).filter(Boolean)} />
    <Content>
      <Name>{site.name}</Name>
      <Description>
        <TextWithLineBreak>{site.description}</TextWithLineBreak>
      </Description>
      <HabitatCount>{`${site.habitats.length} habitats`}</HabitatCount>
    </Content>
  </Container>
)

const Container = styled.article`
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: row;
  background-color: ${white};
  box-shadow: 2px 1px 4px 0px rgba(0, 0, 0, 0.3);
`
const Name = styled.h2`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const Description = styled.p``

const HabitatCount = styled.div`
  font-size: 0.8em;
  margin-left: auto;
  margin-top: auto;
  position: relative;
  left: 4px;
  top: 8px;
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`
const Mosaic = styled(Mosaic_)`
  flex-shrink: 0;
  height: 160px;
  width: 160px;
  position: relative;
`
