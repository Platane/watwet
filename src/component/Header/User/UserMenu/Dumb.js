import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { variant, grey } from '~/component/_abstract/palette'

export const UserMenu = ({ user, offline, logout }) => (
  <Container>
    <Label>Signed as</Label>
    <Name>{user.name}</Name>
    <Separator />
    <Action onClick={logout}>Sign out</Action>
  </Container>
)

const Label = styled.div`
  color: black;
`
const Name = styled.div`
  font-weight: bold;
  color: black;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
const Action = styled.a`
  color: black;
  text-decoration: none;
`

const Separator = styled.div`
  background-color: grey;
  width: 100%;
  height: 1px;
  margin: 20px 0;
`

const Container = styled.div`
  width: 260px;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`
