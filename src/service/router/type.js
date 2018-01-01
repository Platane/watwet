export type Route = {
  path: string,
  key: string,
}

export type Output = {
  key: string | null,
  path: string,
  param: { [string]: string },
}
