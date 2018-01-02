import { injectGlobal, hydrate } from 'preact-emotion'

export default () => {
  if (typeof window !== 'undefined' && window.__emotion_ids)
    hydrate(window.__emotion_ids)

  injectGlobal`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      html,
      body {
        height: 100%;
        position: relative;
        margin: 0;
    }
    `
}
