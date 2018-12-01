import { h, Component } from 'preact'
import styled, { css, keyframes } from 'preact-emotion'
import { variant, grey, black } from '~/component/_abstract/palette'
import { Drive } from '~/component/Icon/Drive'
import { Link } from '~/component/Link'

const createRefresh = ({ path, forceRefreshSite, forceRefreshSites }) => e => {
  if (path[0]) forceRefreshSite(path[0])
  else forceRefreshSites()
}

const preventDefault = e => {
  e.stopPropagation()
  e.preventDefault()
}

export const Panel = ({
  spreadsheetUrl,
  offline,
  fetching,
  diff,
  ...props
}) => (
  <Container>
    <section style={{ marginBottom: '32px' }}>
      {spreadsheetUrl && (
        <Link href={spreadsheetUrl} target="blank">
          <a onMouseDown={preventDefault} onTouchStart={preventDefault}>
            <DriveIcon />
            <span>view of google drive</span>
          </a>
        </Link>
      )}
    </section>

    {!offline && !fetching && (
      <Button
        onMouseDown={preventDefault}
        onTouchStart={preventDefault}
        onClick={createRefresh(props)}
      >
        refresh
      </Button>
    )}

    {offline && diff.length > 0 && (
      <p>you are offline. please connect to publish your changes</p>
    )}

    {offline && diff.length > 0 && (
      <DiffList>
        <p>changes so far:</p>
        {diff.map(({ type }, i) => (
          <p key={i}>- {type}</p>
        ))}
      </DiffList>
    )}
  </Container>
)

const DriveIcon = styled(Drive)`
  width: 18px;
  height: 18px;

  margin-right: 16px;
`

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
