import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { ToastContent } from './ToastContent'

export const ToastZone = ({ toDisplay, close }) => (
  <Container>
    {toDisplay.map((toast, i) => (
      <Toast
        key={toast.id}
        style={{ transform: `translateY(${-i * 81}px)` }}
        onClick={() => close(toast.id)}
      >
        <ToastContent toast={toast} />
        <CloseButton>×</CloseButton>
      </Toast>
    ))}
  </Container>
)

const appear = keyframes`
  0%{ opacity: 0;};
  100%{ opacity: 1;};
`

const Container = styled.div``
const CloseButton = styled.div`
  flex: 40px 0 1;
  font-size: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const Toast = styled.div`
  cursor: pointer;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  transition: transform 280ms ease;
  align-items: center;
  background-color: #dac867;
  background-color: #aaa;
  color: #000;
  letter-spacing: 0.4px;
  font-family: consolas;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
  animation: ${appear} 280ms ease;
`
