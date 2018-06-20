import {
  createDomNavigator,
  initSideEffect as initRouter,
} from 'declarative-router'
import { PATHNAME_BASE } from '~/config'

export const init = initRouter({
  navigator: createDomNavigator({ pathPrefix: PATHNAME_BASE }),
})
