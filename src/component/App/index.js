import { h, Component } from 'preact'
import styled from 'preact-emotion'

import cssReset from '../_abstract/cssReset'

export const App = ({ content, path, onPathChange }) =>
  cssReset() || <Container />

const Container = styled.div``
