type GridCell = string | void
export type Grid = GridCell[][]

export const toGrid = (data): Grid =>
  (data[0].rowData || []).map(({ values = [] }) =>
    values.map(
      ({ formattedValue, userEnteredValue }) =>
        (userEnteredValue &&
          Object.keys(userEnteredValue).reduce(
            (s, key) => s || userEnteredValue[key],
            ''
          )) ||
        formattedValue
    )
  )

export const fillGrid = (w: number, h: number) => (arr: Grid) => {
  while (arr.length < h) arr.push([])

  arr.forEach(row => {
    while (row.length < w) row.push(void 0)
  })
}

export const cutGrid = (
  offsetX: number,
  offsetY: number,
  width: ?number,
  heigth: ?number
) => (arr: Grid) =>
  arr
    .slice(offsetY, typeof heigth == 'number' ? offsetY + heigth : Infinity)
    .map(row =>
      row.slice(offsetX, typeof width == 'number' ? offsetX + width : Infinity)
    )
