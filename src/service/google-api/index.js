import { GOOGLE_CLIENT_ID, GOOGLE_API_KEY } from '~/config'
import { promisify } from '~/util/promisify'

const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'
const GAPI_URL = 'https://apis.google.com/js/api.js'
const DISCOVERY_DOCS = [
  'https://sheets.googleapis.com/$discovery/rest?version=v4',
]

const loadScript = url =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script')

    script.onload = resolve
    script.onerror = reject

    script.src = url
    document.head.appendChild(script)
  })

export const prepare = async () => {
  await loadScript(GAPI_URL)

  const gapi = window.gapi

  const load = await promisify(gapi.load, gapi)('client:auth2')

  await gapi.client.init({
    scope: SCOPES,
    apiKey: GOOGLE_API_KEY,
    clientId: GOOGLE_CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
  })
}
