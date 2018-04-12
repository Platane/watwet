import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { Image } from '~/component/Image'
import { Link } from '~/component/Link'

export const HabitatHeader = ({ habitat }) => (
  <Container>
    <BackgroundW>
      <Background
        src={habitat && habitat.info.picture_url}
        preImage="linear-gradient( 0deg, rgba(0,0,0,0.8), rgba(0,0,0,0.01) 40% ),"
      />
    </BackgroundW>
    <Picture src={habitat && habitat.info.picture_url} />
    <Name>{habitat && habitat.info.name}</Name>

    <EditButton>
      <Link href={`/site/${habitat.siteId}/habitat/${habitat.id}/edit`}>
        <A>edit</A>
      </Link>
    </EditButton>
  </Container>
)

const BackgroundW = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`

const A = styled.a`
  text-decoration: none;

  transition: transform 100ms ease;

  color: inherit;

  &:visited {
    color: inherit;
  }

  &:active {
    color: inherit;
    transform: scale(0.98, 0.98);
  }
`

const nameAnimation = keyframes`
  0%{ transform: translateY(50px); opacity:0;}
  100%{ transform: translateY(0); opacity:1;}
`

const EditButton = styled.div`
  position: absolute;
  bottom: 4px;
  right: 16px;
  color: #fff;
`

const Name = styled.div`
  position: absolute;
  height: 20px;
  bottom: 10px;
  left: 10px;
  right: 10px;
  text-align: center;
  color: #fff;
  font-size: 1.2em;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0);
  animation: ${nameAnimation} 280ms ease;
`

const Background = styled(Image)`
  width: 100%;
  height: 100%;
  filter: blur(16px) contrast(0.9) brightness(1.3);
  transform: scale(1.3, 1.3);
`

const Picture = styled(Image)`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: solid 4px #fff;
  position: relative;
`

const Container = styled.div`
  height: 260px;
  position: relative;
  margin-bottom: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`
