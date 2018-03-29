import type { Site } from 'type'

export const list = async () => {
  const gapi = window.gapi

  const res = await gapi.client.drive.files.list({
    q:
      "mimeType='application/vnd.google-apps.spreadsheet' and name contains 'site_' and trashed = false",
    spaces: 'drive',
  })

  return res.result.files
    .filter(x => x.name.slice(0, 5) == 'site_')
    .map(x => ({ id: x.id, name: x.name.slice(5) }))
}

export const listId = async () => (await list()).map(x => x.id)
