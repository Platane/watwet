import { h } from 'preact'
import styled from 'preact-emotion'
import { grey } from '~/component/_abstract/palette'
import { UserMenu } from './UserMenu'
import { DropDown } from '~/component/DropDown'

export const UserButton = ({ user }) => (
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
