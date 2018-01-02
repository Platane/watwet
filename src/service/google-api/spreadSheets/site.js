import type { Vegetal } from 'type'

export const list = async () => {
  const gapi = window.gapi

  const res = await gapi.client.drive.files.list({
    q: "mimeType='application/vnd.google-apps.spreadsheet'",
    spaces: 'drive',
  })

  return res.result.files.map(x => ({ id: x.id, name: x.name }))
}
