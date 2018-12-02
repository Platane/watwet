// @flow

import type { Store, State } from 'redux'

/**
 * return a promise which resolve when the condition function return truthly
 */
export const waitFor = (
  store: Store,
  condition: (state: State) => Object
): Promise<Object> =>
  new Promise(resolve => {
    let unsubscribe

    const check = () => {
      const res = condition(store.getState())
      if (res) {
        unsubscribe()
        resolve(res)
      }
    }

    unsubscribe = store.subscribe(check)

    check()
  })
