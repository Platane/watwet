import { h, Component } from 'preact'
import styled from 'preact-emotion'

export const Header = ({ user, logout }) => (
  <Container>
    {user && user.name}
    {user && <button onClick={logout}>logout</button>}
  </Container>
)

const Container = styled.div`
  background-color: #eee;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
`
