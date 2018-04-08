import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { white, variant, grey } from '~/component/_abstract/palette'
import { UserButton } from './User'
import { SyncIndicator } from './SyncIndicator'
import { Gear } from '~/component/Icon/Gear'
import { Drive } from '~/component/Icon/Drive'
import { Link } from '~/component/Link'
import { Breadcrumb } from '~/component/Breadcrumb'

export const Header = ({ spreadsheetUrl, user, goToSetting, goToHome }) => (
  <Container>
    <Content>
      <Breadcrumb />
      <Spacer />
      <Left>
        {spreadsheetUrl && (
          <Link target="blank" href={spreadsheetUrl}>
            <a title="view on google doc">
              <DriveIcon />
            </a>
          </Link>
        )}
        <Spacer />
        <SyncIndicator />
        <Spacer />
        {user && <UserButton user={user} />}
        <Spacer />
        <Link href="/setting">
          <SettingButton>
            <GearIcon color={white} />
          </SettingButton>
        </Link>
      </Left>
    </Content>
  </Container>
)

const Spacer = styled.div`
  width: 8px;
  height: 8px;
`

const SettingButton = styled.a`
  display: block;

  &:active {
    transform: scale(0.9, 0.9);
  }
`
const DriveIcon = styled(Drive)`
  width: 22px;
  height: 22px;

  &:active {
    transform: scale(0.9, 0.9);
  }
`

const GearIcon = styled(Gear)`
  width: 28px;
  height: 28px;
`

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
