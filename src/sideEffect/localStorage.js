import { write, read } from '~/service/localStorage'
import { selectCurrentUser } from '~/store/selector/currentUser'
import { read as readAction } from '~/store/action/localStorage'
import { debounce, wait } from '~/util/time'
import { createSelector } from 'reselect'

const createPersist = (label, selector) => {
  let persisted = null

  return state => {
    const x = selector(state)

    if (x !== persisted) {
      persisted = x
      write(label, x)
    }
  }
}

const extractNonStatic = o => {
  const copy = {}
  for (let key in o)
    if (!['vegetalDictionary', 'habitatDictionary'].includes(key))
      copy[key] = o[key]
  return copy
}

const selectStaticResources = createSelector(
  state => state.resource.original.vegetalDictionary,
  state => state.resource.original.habitatDictionary,
  (vegetalDictionary, habitatDictionary) => ({
    original: {
      habitatDictionary,
      vegetalDictionary,
    },
  })
)

const selectNonStaticResources = createSelector(
  state => state.resource,
  ({ original, mutated, dateMutated, dateFetched }) => ({
    original: extractNonStatic(original),
    mutated,
    dateMutated,
    dateFetched,
  })
)

export const init = store => {
  const persistUser = createPersist('watwet-user', selectCurrentUser)
  const persistStaticResources = createPersist(
    'watwet-resources-static',
    selectStaticResources
  )
  const persistNonStaticResources = createPersist(
    'watwet-resources-nonstatic',
    selectNonStaticResources
  )

  const update = () => {
    const state = store.getState()

    persistUser(state)
    persistStaticResources(state)
    persistNonStaticResources(state)
  }

  const r = () => {
    const user = read('watwet-user')
    const resourcesStatic = read('watwet-resources-static')
    const resourcesNonStatic = read('watwet-resources-nonstatic')

    return {
      user,
      resource:
        resourcesStatic && resourcesNonStatic
          ? {
              ...resourcesNonStatic,
              original: {
                ...(resourcesStatic.original || {}),
                ...(resourcesNonStatic.original || {}),
              },
            }
          : null,
    }
  }

  const debouncedUpdate = debounce(1000)(update)

  store.dispatch(readAction(r()))

  debouncedUpdate()

  store.subscribe(debouncedUpdate)
}
