import type { Site } from 'type'

const isPrefix = (prefix, text) => text.slice(0, prefix.length) == prefix

export const list = async () => {
  const gapi = window.gapi

  const res = await gapi.client.drive.files.list({
    q:
      "mimeType='application/vnd.google-apps.spreadsheet' and name contains 'ww-site-' and trashed = false",
    spaces: 'drive',
    pageSize: 1000,
    orderBy: 'modifiedTime desc',
  })

  return res.result.files
    .filter(x => isPrefix('ww-site-', x.name))
    .map(x => ({ id: x.id }))
}

export const listId = async () => (await list()).map(x => x.id)
