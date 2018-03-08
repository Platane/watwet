type Entity = any

type EntityPool = {
  [string]: {
    updated: Entity | null,
    reference: Entity,
    modifiedDate: number,
    refreshedDate: number,
  },
}

type Mutation = {
  entityName: string,
  id: string,
  date: number,
}

export type State = {
  cache: {
    [string]: EntityPool,
  },
  mutations: Mutation[],
}
