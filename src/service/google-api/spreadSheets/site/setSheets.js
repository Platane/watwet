export const setSheets = (old_sheets, sheets_title) => {
  const requests = []

  // remove useless sheets
  requests.push(
    ...old_sheets
      .splice(sheets_title.length, Infinity)
      .map(x => ({ deleteSheet: { sheetId: x.properties.sheetId } }))
  )

  // add extra sheets
  sheets_title.slice(old_sheets.length).forEach(_ => {
    const sheetId = 0 | (Math.random() * (1 << 30))

    old_sheets.push({ properties: { sheetId } })

    requests.push({
      addSheet: {
        properties: { sheetId },
      },
    })
  })

  // re-order sheet
  sheets_title.forEach((title, i) => {
    const sheet = old_sheets.find(x => x.properties.title === title)

    if (!sheet) return

    if (sheet.properties.index == i) return

    sheet.properties.index = i

    requests.push({
      updateSheetProperties: {
        properties: {
          sheetId: sheet.properties.sheetId,
          index: i,
        },
        fields: 'index',
      },
    })
  })

  old_sheets.sort((a, b) => (a.properties.index > b.properties.index ? 1 : -1))

  // rename sheet
  sheets_title.forEach((title, i) => {
    if (
      old_sheets[i].properties.title === title &&
      old_sheets[i].properties.index === i
    )
      return

    old_sheets[i].properties.title = title
    old_sheets[i].properties.index = i

    requests.push({
      updateSheetProperties: {
        properties: {
          sheetId: old_sheets[i].properties.sheetId,
          title,
          index: i,
        },
        fields: 'title,index',
      },
    })
  })

  return requests
}
