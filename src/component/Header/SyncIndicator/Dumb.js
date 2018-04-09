import { h, Component } from 'preact'
import styled, { css, keyframes } from 'preact-emotion'
import { variant, grey } from '~/component/_abstract/palette'
import { Transition } from 'react-propstransition'
import { DropDown } from '~/component/DropDown'
import { TimeAgo } from '~/component/TimeAgo'
import { Panel } from './Panel'

export const SyncIndicator = ({
  display,
  lastSyncDate,
  mutated,
  fetching,
  offline,
}) =>
  display ? (
    <Transition toTransition={!offline && mutated} delay={1200}>
      {({ next, previous, transition }) => (
        <DropDown inside={Panel} side="left">
          <Info>
            {!next && transition && <OkIcon />}
            {(next || fetching) && <SpinIcon />}

            <Label>
              {offline && 'offline, '}

              {next && 'saving …'}

              {fetching && 'loading …'}

              {!next && transition && 'saved'}

              {(offline || (!fetching && !next && !transition)) && 'last sync '}
              {(offline || (!fetching && !next && !transition)) && (
                <TimeAgo date={lastSyncDate} />
              )}
            </Label>
          </Info>
        </DropDown>
      )}
    </Transition>
  ) : null

const Label = styled.span`
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
