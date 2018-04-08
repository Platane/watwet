import { h } from 'preact'
import styled from 'preact-emotion'
import { white, vibrant, black } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'

export const Breadcrumb = ({ paths, ...props }) => (
  <Container {...props}>
    {paths.map(({ href, label }) => (
      <Link key={href} href={href}>
        <Fragment>
          <Label>{label}</Label>
        </Fragment>
      </Link>
    ))}
  </Container>
)

const Container = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const Label = styled.span`
  display: inline-block;
  max-width: 160px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
const Fragment = styled.a`


  position: relative;
  
  font-size: 14px;
  color: inherit;
  text-decoration: none;


  &:after {
    content: '>';
    position: absolute;
    right: -20px;
  }
  
  
  margin-right:  32px;
  &:last-child {
    margin-right:  0px;
    &:after {
      content: none;
  }
  
`
