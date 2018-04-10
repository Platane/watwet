import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { vibrant, white } from '~/component/_abstract/palette'

export const Login = ({ pending, login }) => (
  <Container>
    <Info>
      <InfoTitle>Hello here</InfoTitle>
      <InfoLine>
        This app is meant to help you set up a list of vegetals.
      </InfoLine>
      <InfoLine>
        Every list you build will be persisted in your google Drive.
      </InfoLine>
      <InfoLine>That's why we first need you to login.</InfoLine>
    </Info>

    {!pending && (
      <Center>
        <Label>Please login to your google account</Label>
        <Button onClick={login}>Login</Button>
      </Center>
    )}
  </Container>
)

const Info = styled.section`
  width: calc(100% - 40px);
  max-width: 400px;
  background-color: ${white};
  padding: 32px;
  border-radius: 4px;
  box-shadow: 2px 1px 4px 0px rgba(0, 0, 0, 0.3);
  margin-bottom: 64px;
`
const InfoTitle = styled.h1`
  margin-bottom: 1em;
`
const InfoLine = styled.p`
  margin-bottom: 1em;

  &:last-child {
    margin-bottom: auto;
  }
`

const Container = styled.div`
  z-index: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 10px 1 1;
  min-height: 600px;
`

const Center = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Big = styled.div`
  font-size: 80px;
`
const Button = styled.button`
  margin-top: 16px;

  background-color: ${vibrant[2]};
  color: ${white};
  font-size: 40px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 1px 4px 0px;
  text-align: center;
  padding: 20px;
  min-width: 200px;
  border-radius: 4px;
`
const Label = styled.div``
