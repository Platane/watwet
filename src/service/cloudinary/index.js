import { parse as url_parse, format as url_format } from 'url'
import supportsWebP from 'supports-webp'

const pixelratio =
  typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1

const trimExtension = x => (x || '').replace(/(\.[a-z]+)$/, '')

const getDim = size =>
  (size === 'small' && 300) ||
  (size === 'medium' && 600) ||
  (size === 'large' && 900) ||
  (size === 'xlarge' && 1200) ||
  (size === 'xxlarge' && 1800) ||
  1200

const buildTransformString = ({ size = 'medium' }) =>
  [
    //
    `w_${Math.round(pixelratio * getDim(size))}`,
    'c_limit',
    'q_auto:good',
  ].join(',')

export const createTransform = (options = {}) => (url: string) => {
  const o = url_parse(url)

  // webp support
  {
    o.pathname = trimExtension(o.pathname)
    if (supportsWebP) o.pathname += '.webp'
  }

  // tranform
  {
    const path = o.pathname.split('/').filter(Boolean)

    path.splice(
      path.findIndex(x => x === 'upload') + 1,
      0,
      buildTransformString(options)
    )

    o.pathname = path.join('/')
  }
  return url_format(o)
}
