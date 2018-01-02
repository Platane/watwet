import { connect } from 'preact-redux'
import { Habitat as mobile } from './Dumb.mobile'
import { Habitat as desktop } from './Dumb.mobile'
// import { goTo } from '~/store/action/'
import { selectCurrentHabitat } from '~/store/selector/currentHabitat'
import layoutMultiplexor from '~/component/_abstract/hoc.layoutMultiplexor'

const injectState = connect(
  state => ({
    habitat: selectCurrentHabitat(state),
  }),
  dispatch => ({
    updateHabitat: habitat => dispatch({ type: 'update:habitat', habitat }),
  })
)

export const Habitat = injectState(layoutMultiplexor({ desktop, mobile }))
