import { h, Component } from 'preact'
import styled, { css, keyframes } from 'preact-emotion'
import { variant, grey } from '~/component/_abstract/palette'
import { Transition } from 'react-propstransition'
import { TimeAgo } from '~/component/TimeAgo'
import { Drive } from '~/component/Icon/Drive'
import { Link } from '~/component/Link'

export const Label = ({
  lastSyncDate,
  mutated,
  fetching,
  offline,
  spreadsheetUrl,
}) => (
  <Transition toTransition={mutated} delay={1200}>
    {({ next, previous, transition }) => (
      <Info>
        {spreadsheetUrl && (
          <Link
            target="blank"
            href={spreadsheetUrl}
            onClick={e => e.stopPropagation()}
            external
          >
            <a title="view on google doc">
              <DriveIcon />
            </a>
          </Link>
        )}

        {!offline && !next && transition && <OkIcon />}
        {!offline && (next || fetching) && <SpinIcon />}

        <LabelText>
          {offline && 'offline, '}

          {!offline && next && !fetching && 'saving …'}

          {!offline && fetching && 'loading …'}

          {!offline && !next && transition && 'saved'}

          {(offline || (!fetching && !next && !transition)) && lastSyncDate && (
            <span>
              <span>last sync </span>
              <TimeAgo date={lastSyncDate} />
            </span>
          )}
        </LabelText>
      </Info>
    )}
  </Transition>
)

const LabelText = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  min-width: 100px;
  font-size: 12px;
`
const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 32px;
  cursor: pointer;
`

const spin = keyframes`
  0%{ transform: rotate(0deg)};
  100%{ transform: rotate(360deg)};
`

const pop = keyframes`
  0%{ opacity:0; transform: scale(0.4,0.4)};
  70%{ opacity:1; transform: scale(1.25,1.25)};
  100%{ opacity:1; transform: scale(1,1)};
`

const DriveIcon = styled(Drive)`
  width: 18px;
  height: 18px;
  margin-right: 16px;

  &:active {
    transform: scale(0.9, 0.9);
  }
`

const SpinIcon = styled.span`
  animation: ${spin} 600ms linear Infinite;

  font-size: 22px;

  &::after {
    content: '↻';
  }
`

const OkIcon = styled.span`
  animation: ${pop} 500ms linear;

  font-size: 30px;

  &::after {
    content: '✓';
  }
`

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
