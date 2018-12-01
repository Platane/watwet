import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { variant, grey } from '~/component/_abstract/palette'
import { DropDown } from '~/component/DropDown'
import { Panel } from './Panel'
import { Label } from './Label'

export const SyncIndicator = ({ display }) =>
  display ? (
    <DropDown inside={Panel} side="left">
      <Label />
    </DropDown>
  ) : null
