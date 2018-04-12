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
      (b, b_index) =>
        !previous_sheets.some(a => a.properties.sheetId == b.properties.sheetId)
    )
    .map((b, b_index) => {
      const a = previous_sheets.some(
        a => a.properties.sheetId == b.properties.sheetId
      )

      if (a) return

      return {
        addSheet: {
          properties: {
            sheetId: b.properties.sheetId,
            title: b.properties.title,
            index: b_index,
          },
        },
      }
    })
    .filter(Boolean),

  //
  //
  // re-order / re-name sheet
  ...next_sheets
    .map((b, b_index) => {
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
            sheetId: b.properties.sheetId,
            index: b_index,
            title: b.properties.title,
          },
          fields: [
            a.properties.title !== b.properties.title && 'title',
            a.properties.index !== b_index && 'index',
          ]
            .filter(Boolean)
            .join(','),
        },
      }
    })
    .filter(Boolean),
]
