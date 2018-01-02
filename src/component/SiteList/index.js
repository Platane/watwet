import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { Site } from './Site'

export const SiteList = ({ sites, onClickSite }) => (
  <Container>
    {sites.map(site => (
      <Site
        key={site.id}
        {...site}
        onClick={onClickSite && (() => onClickSite(site))}
      />
    ))}
  </Container>
)

const Container = styled.div``
