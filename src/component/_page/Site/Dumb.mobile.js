import { h, Component } from 'preact'
import styled from 'preact-emotion'

import { LevelSelector } from '~/component/LevelSelector'

export const Site = ({ site, updateSite }) => (
  <Container>
    {site && site.info.name}

    <LevelSelector
      site={site}
      onSiteChange={updateSite}
      onSelect={e => console.log(e)}
    />
  </Container>
)

const Container = styled.div`
  max-width: 800px;
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  flex: 100px 1 1;
`
