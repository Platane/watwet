import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { variant, grey } from '~/component/_abstract/palette'
import { UserMenu } from './UserMenu'
import { DropDown } from '~/component/DropDown'

const UserButton = ({ user }) => (
  <DropDown inside={UserMenu}>
    <Portrait style={{ backgroundImage: `url(${user.picture_url})` }} />
  </DropDown>
)

const Portrait = styled.div`
  background-color: ${grey};
  background-position: center;
  background-size: cover;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`

export const Header = ({ spreadSheetUrl, user }) => (
  <Container>
    <Content>
      <a target="blank" href={spreadSheetUrl}>
        view on google doc
      </a>
      <Left>{user && <UserButton user={user} />}</Left>
    </Content>
  </Container>
)

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
`
const Content = styled.div`
  width: 100%;
  max-width: 800px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  margin-left: auto;
  margin-right: auto;
`
const Container = styled.div`
  background-color: ${variant[2]};
  box-shadow: 0 -5px 10px 5px rgba(0, 0, 0, 0.3);
  width: 100%;
  display: flex;
  flex-direction: row;
`
