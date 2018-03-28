import { write, read } from '~/service/localStorage'
import { selectCurrentUser } from '~/store/selector/currentUser'
import { read as readAction } from '~/store/action/localStorage'
import { debounce, wait } from '~/util/time'

const createPersist = (label, selector) => {
  let persisted = null

  return state => {
    const x = selector(state)

    if (x !== persisted) {
      console.log('persist', label)
      persisted = x
      write(label, x)
    }
  }
}

const createPersistObject = (rootLabel, o) => {
  const createPersistTree = (label, o) =>
    typeof o === 'function'
      ? [createPersist(label, o)]
      : [].concat(
          ...Object.keys(o).map(key =>
            createPersistTree(label + '-' + key, o[key])
          )
        )

  const createReadTree = (label, o) => () =>
    typeof o === 'function'
      ? read(label)
      : Object.keys(o).reduce((u, key) => ({
          ...u,
          [key]: createReadTree(label + '-' + key, o[key]),
        }))

  const persistList = createPersistTree(rootLabel, o)
  const read = createReadTree(rootLabel, o)

  return {
    write: state => persistList.forEach(fn => fn(state)),
    read,
  }
}

export const init = store => {
  const { write, read } = createPersistObject('watwet', {
    user: selectCurrentUser,
    resource: {
      original: state => state.resource.original,
      mutated: state => state.resource.mutated,
      dateFetched: state => state.resource.dateFetched,
      dateMutated: state => state.resource.dateMutated,
    },
  })

  const update = debounce(1000)(() => {
    let start = Date.now()

    write(store.getState())

    console.log(Date.now() - start, 'ms')
  })

  store.dispatch(readAction(read()))

  update()

  store.subscribe(update)
}
