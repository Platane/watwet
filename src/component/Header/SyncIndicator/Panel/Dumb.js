import { h, Component } from 'preact'
import styled, { css, keyframes } from 'preact-emotion'
import { variant, grey, black } from '~/component/_abstract/palette'

const createRefresh = ({ path, forceRefreshSite, forceRefreshSites }) => e => {
  e.stopPropagation()
  e.preventDefault()

  if (path[0]) forceRefreshSite(path[0])
  else forceRefreshSites()
}

export const Panel = ({ offline, fetching, diff, ...props }) => (
  <Container>
    {!offline &&
      !fetching && (
        <Button
          onMouseDown={createRefresh(props)}
          onTouchStart={createRefresh(props)}
        >
          refresh
        </Button>
      )}

    {offline &&
      diff.length > 0 && (
        <p>you are offline. please connect to publish your changes</p>
      )}

    {offline &&
      diff.length > 0 && (
        <DiffList>
          <p>changes so far:</p>
          {diff.map(({ type }, i) => <p key={i}>- {type}</p>)}
        </DiffList>
      )}
  </Container>
)

const Button = styled.button`
  display: block;
  padding: 8px;
`

const DiffList = styled.div`
  margin-top: 20px;
  font-size: 14px;
`
const Container = styled.div`
  width: 240px;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: ${black};
`
