import { h } from 'preact'
import { connect } from 'preact-redux'
import { Wallpaper as Dumb } from './Dumb'
import { selectCurrentLayer } from '~/store/selector/currentLayer'
import { selectCurrentUser } from '~/store/selector/currentUser'
import { vibrant, variant, trio, white } from '~/component/_abstract/palette'

const getColor = state => {
  if (!selectCurrentUser(state))
    return {
      color: vibrant[1],
    }

  switch (state.router.key) {
    case 'habitat':
      switch (selectCurrentLayer(state)) {
        case 'h':
          return {
            color: trio[0],
            pattern: 'herb',
          }
        case 'a':
          return {
            color: trio[1],
            pattern: 'bush',
          }
        case 'A':
          return {
            color: trio[2],
            pattern: 'pine',
          }
        default:
          return {
            color: trio[2],
          }
      }

    case 'home':
    case 'siteList':
    case 'siteCreate':
      return {
        color: vibrant[0],
      }

    case 'habitatList':
      return {
        color: vibrant[2],
      }

    case 'habitatCreate':
      return {
        color: vibrant[3],
      }

    default:
      return {
        color: vibrant[1],
      }
  }
}

export const Wallpaper = connect(getColor)(Dumb)
