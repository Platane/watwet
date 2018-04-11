type Error = {
  id: string,
  date: number,
  type: 'fetch',
  error: Error,
  key: string,
}

export type State = Error[]
