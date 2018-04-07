import { h, Component } from 'preact'
import styled, { css, keyframes } from 'preact-emotion'
import { variant, grey } from '~/component/_abstract/palette'
import { Transition } from 'react-propstransition'
import { DropDown } from '~/component/DropDown'
import { TimeAgo } from '~/component/TimeAgo'

const Panel = () => <span>hello</span>

// <DropDown inside={Panel}>

export const SyncIndicator = ({
  display,
  path,
  lastSyncDate,
  mutated,
  offline,
}) =>
  display ? (
    <Transition toTransition={!offline && mutated} delay={1200}>
      {({ next, previous, transition }) => (
        <Info>
          <IconWrapper>
            {!next && transition && <OkIcon />}
            {next && <SpinIcon />}
          </IconWrapper>

          <Label>
            {offline && 'offline,'}

            {next && 'saving …'}

            {!next && transition && 'saved'}

            {(offline || (!next && !transition)) && 'last sync '}
            {(offline || (!next && !transition)) && (
              <TimeAgo date={lastSyncDate} />
            )}
          </Label>
        </Info>
      )}
    </Transition>
  ) : null

const Label = styled.span`
  min-width: 160px;
  font-size: 12px;
`
const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 32px;
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
