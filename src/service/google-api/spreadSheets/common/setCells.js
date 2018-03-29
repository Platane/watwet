import type { Grid } from './grid'
import { fillGrid } from './grid'

const formatValue = x =>
  (x && x[0] === '=' && { formulaValue: x }) ||
  (typeof x === 'number' && { numberValue: x }) ||
  (typeof x === 'boolean' && { boolValue: x }) ||
  (typeof x === 'string' && { stringValue: x }) ||
  null

export const setCells = (sheetId: string, old_cells: Grid, new_cells: Grid) => {
  const requests = []

  const h = Math.max(old_cells.length, new_cells.length)
  const w = Math.max(
    ...old_cells.map(row => row.length),
    ...new_cells.map(row => row.length)
  )

  fillGrid(w, h)(old_cells)
  fillGrid(w, h)(new_cells)

  // prettier-ignore
  for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    //

    if (old_cells[y][x] != new_cells[y][x])
      requests.push({
        updateCells: {
          rows: [
            { values: [{ userEnteredValue: formatValue(new_cells[y][x]) }] },
          ],
          fields: 'userEnteredValue',
          range: {
            sheetId,
            startRowIndex: y,
            endRowIndex: y+1,
            startColumnIndex: x,
            endColumnIndex: x+1,
          },
        },
      })
  }
  }

  return requests
}
