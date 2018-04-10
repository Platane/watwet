import { h, Component } from 'preact'
import styled from 'preact-emotion'

export const TextWithLineBreak = ({ children, p = 'p', ...props }) => (
  <div {...props}>
    {(children[0] || '').split('\n').map((text, key) => h(p, { key }, text))}
  </div>
)
