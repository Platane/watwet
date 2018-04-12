type Sheet = {
  properties: {
    sheetId: number,
    index: number,
    title?: string,
  },
}

export const setSheets = (previous_sheets: Sheet[], next_sheets: Sheet[]) => [
  //
  //
  // remove useless sheets
  ...previous_sheets
    .filter(
      a => !next_sheets.some(b => a.properties.sheetId == b.properties.sheetId)
    )
    .map(x => ({ deleteSheet: { sheetId: x.properties.sheetId } })),

  //
  //
  // add extra sheets
  ...next_sheets
    .filter(
      a =>
        !previous_sheets.some(b => a.properties.sheetId == b.properties.sheetId)
    )
    .map(x => ({ addSheet: x })),

  //
  //
  // re-order / re-name sheet
  ...next_sheets
    .map((b, i) => {
      const b_index = i

      const a = previous_sheets.find(
        a => a.properties.sheetId === b.properties.sheetId
      )

      if (!a) return

      if (
        a.properties.title === b.properties.title &&
        a.properties.index === b_index
      )
        return

      return {
        updateSheetProperties: {
          properties: {
            index: b_index,
            title: b.properties.title,
          },
          fields: 'index,title',
        },
      }
    })
    .filter(Boolean),
]
