import { deepEqual } from '~/util/object'
import { format as formatHabitat } from './parse/habitat'

const template_id = '16fF8PwRsD77wAlWrfOWOb0btEVtCLuD37AKwX7hdAB8'

export const setInTemplate = async () => {
  const gapi = window.gapi

  const res = await gapi.client.sheets.spreadsheets.get({
    spreadsheetId: template_id,
    includeGridData: true,
    ranges: ['habitat!A1:F'],
  })

  const { sheets, namedRanges } = res.result
  const habitat_template = sheets[0]

  const extractLine = (rowData, range) =>
    rowData[range.startRowIndex].values.slice(
      range.startColumnIndex,
      range.endColumnIndex
    )

  const vegetal_range = namedRanges.find(x => x.name === 'habitat_vegetals')
    .range

  const vegetal_row_format = extractLine(
    habitat_template.data[0].rowData,
    vegetal_range
  )
  const vegetal_separator_format = extractLine(
    habitat_template.data[0].rowData,
    namedRanges.find(x => x.name === 'habitat_vegetals_separator').range
  )

  return (old_sheet, habitat) => {
    const requests = []

    const sheetId = old_sheet.properties.sheetId

    !!res

    // set the merged cell
    if (!deepEqual(old_sheet.merges, habitat_template.merges))
      requests.push(
        {
          unmergeCells: {
            range: {
              sheetId,
              startRowIndex: 0,
              startColumnIndex: 0,
            },
          },
        },
        ...habitat_template.merges.map(x => ({
          mergeCells: {
            range: { ...x, sheetId },
            mergeType: 'MERGE_ALL',
          },
        }))
      )

    requests.push({
      updateCells: {
        rows: habitat_template.data[0].rowData.slice(
          0,
          vegetal_range.startRowIndex
        ),

        fields: '*',
        range: {
          sheetId,
          startRowIndex: 0,
          startColumnIndex: 0,
        },
      },
    })

    // TODO: dimmension

    namedRanges.forEach(({ range, name }) => {
      let value = null

      switch (name) {
        case 'habitat_name':
          value = { stringValue: habitat.info.name }
          break
        case 'habitat_codeCorineBiotipe':
          value = { stringValue: habitat.info.codeCorineBiotipe }
          break
        case 'habitat_codeNatura2000':
          value = { stringValue: habitat.info.codeNatura2000 }
          break
        case 'habitat_description':
          value = { stringValue: habitat.info.description }
          break
        case 'habitat_localisation':
          value = { stringValue: habitat.info.localisation }
          break
        case 'habitat_picture':
          value = { formulaValue: `=IMAGE("${habitat.info.picture_url}")` }
          break
        case 'habitat_vegetals':
          const rows = formatHabitat(habitat).map(x => ({
            values: x.map((x, i, arr) => {
              const separator = !!arr[0].match(/strate /)

              const s = (separator
                ? vegetal_separator_format
                : vegetal_row_format)[i]

              return {
                effectiveFormat: s.effectiveFormat,
                userEnteredFormat: s.userEnteredFormat,
                userEnteredValue:
                  typeof x === 'number'
                    ? { numberValue: x }
                    : { stringValue: x },
              }
            }),
          }))
          return requests.push({
            updateCells: {
              rows,
              fields: 'userEnteredValue,effectiveFormat,userEnteredFormat',
              start: {
                sheetId,
                rowIndex: range.startRowIndex,
                columnIndex: range.startColumnIndex,
                columnIndex: 0,
              },
            },
          })

        default:
          return
      }

      requests.push({
        updateCells: {
          rows: [
            {
              values: [
                {
                  userEnteredValue: value,
                },
              ],
            },
          ],
          fields: 'userEnteredValue',
          range: {
            ...range,
            sheetId,
          },
        },
      })
    })

    return requests
  }
}
