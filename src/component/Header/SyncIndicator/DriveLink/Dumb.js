import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { Drive } from '~/component/Icon/Drive'
import { Link } from '~/component/Link'

export const DriveLink = ({ spreadsheetUrl }) =>
  !spreadsheetUrl ? null : (
    <Link
      target="blank"
      onClick={stopPropagation}
      href={spreadsheetUrl}
      external
    >
      <a title="view on google doc">
        <DriveIcon />
      </a>
    </Link>
  )

const DriveIcon = styled(Drive)`
  width: 18px;
  height: 18px;
  margin-right: 16px;

  &:active {
    transform: scale(0.9, 0.9);
  }
`

const stopPropagation = e => e.stopPropagation()
