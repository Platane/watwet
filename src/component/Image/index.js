import { h, Component } from 'preact'
import styled from 'preact-emotion'

export const Image = ({ url, style, ...props }) => (
  <Image_
    {...props}
    style={{
      backgroundImage: `url(${url}) ${props.postImage || ''}`,
      ...(style || {}),
    }}
  />
)

const Image_ = styled.div`
  background-color: #aaa;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`
