import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { grey, vibrant } from '~/component/_abstract/palette'
import { InputImage as InputImage_ } from '~/component/InputImage'
import { Button } from '~/component/Button'

/**
 * collection of styled component to use in a form
 */

export const PageTitle = styled.h1``

export const Separator = styled.div`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`

export const InputText = styled.input`
  padding: 14px 20px;
  border: none;
  border-radius: 2px;
  width: 100%;
`

export const InputImage = styled(InputImage_)`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  background-color: ${vibrant[1]};
  border: solid 4px #fff;
  overflow: hidden;
  flex-shrink: 0;
  margin: 0 auto;
`

export const Textarea = styled.textarea`
  padding: 14px 20px;
  width: 100%;
  height: 80px;
  border-radius: 2px;
  border: none;
  background-color: #fff;
  transition: background-color 260ms ease;
  resize: none;
`

const pop = keyframes`
  0%{opacity:0; transform: translateY(40px)}
  100%{opacity:1; transform: translateY(0)}
`

export const SubmitButton = styled(Button)`
  animation: ${pop} 180ms ease;
`

export const RemoveButton = styled(Button)`
  animation: ${pop} 180ms ease;
  margin-left: auto;
`

export const Container = styled.div`
  z-index: 2;
  position: relative;
  margin: 20px auto;
  max-width: 800px;
  width: calc(100% - 40px);
`

export const A = styled.a`
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
