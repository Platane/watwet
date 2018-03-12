import { connect } from 'preact-redux'
import { Habitat as mobile } from './Dumb.mobile'
import { Habitat as desktop } from './Dumb.mobile'
import { updateHabitat } from '~/store/action/mutation'
import { selectLayer } from '~/store/action/router'
import { selectCurrentHabitat } from '~/store/selector/currentHabitat'
import { selectVegetalDictionary } from '~/store/selector/dictionaries'
import {
  filterVegetal,
  selectCurrentLayer,
} from '~/store/selector/currentLayer'
import layoutMultiplexor from '~/component/_abstract/hoc.layoutMultiplexor'
import { compose } from '~/util/compose'

const injectState = connect(
  state => ({
    currentLayer: selectCurrentLayer(state),
    habitat: selectCurrentHabitat(state),
    vegetals: selectVegetalDictionary(state) || [],
  }),
  {
    selectLayer,
    updateHabitat,
  }
)

export const Habitat = injectState(layoutMultiplexor({ desktop, mobile }))
