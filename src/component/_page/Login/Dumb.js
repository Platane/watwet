import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { variant, white } from '~/component/_abstract/palette'

export const Login = ({ pending, login }) => (
  <Container>
    {!pending && (
      <Center>
        <Big>:(</Big>
        <Label>Please login to your google account</Label>
        <Button onClick={login}>Login</Button>
      </Center>
    )}
  </Container>
)

const Container = styled.div`
  z-index: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 10px 1 1;
`

const Center = styled.div`
  width: 80%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Big = styled.div`
  font-size: 80px;
`
const Button = styled.div`
  margin-top: 40px;

  background-color: ${variant[2]};
  color: ${white};
  font-size: 40px;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 1px 4px 0px;
  text-align: center;
  padding: 20px;
  min-width: 200px;
  border-radius: 4px;
`
const Label = styled.div``
