import { connect } from 'preact-redux'
import { Habitat as mobile } from './Dumb.mobile'
import { Habitat as desktop } from './Dumb.mobile'
import { updateHabitat } from '~/store/action/mutation'
import { selectCurrentHabitat } from '~/store/selector/currentHabitat'
import layoutMultiplexor from '~/component/_abstract/hoc.layoutMultiplexor'

const injectState = connect(
  state => ({
    habitat: selectCurrentHabitat(state),
    vegetals: state.resource.vegetalDictionary || [],
  }),
  {
    updateHabitat,
  }
)

export const Habitat = injectState(layoutMultiplexor({ desktop, mobile }))
