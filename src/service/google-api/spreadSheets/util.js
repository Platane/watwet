export const toPromise = pseudoPromise =>
  new Promise((resolve, reject) => pseudoPromise.then(resolve, reject))

export const getAllSheets = (spreadsheetId: string, ranges: string[]) =>
  toPromise(
    window.gapi.client.sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges,
    })
  ).catch(x => {
    const error = x.result.error

    let m
    if (
      error &&
      error.message &&
      error.code == 400 &&
      (m = error.message.match(/Unable to parse range: (.*)$/))
    ) {
      const r = m[1].trim()

      return getAllSheets(spreadsheetId, ranges.filter(x => x !== r))
    }

    return Promise.reject(error)
  })
