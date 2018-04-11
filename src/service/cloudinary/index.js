import { parse as url_parse, format as url_format } from 'url'
// import supportsWebP from 'supports-webp'
const supportsWebP =
  typeof window === 'undefined' ? require('supports-webp') : false

const pr = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1

const trimExtension = x => (x || '').replace(/(\.[a-z]+)$/, '')

const getDim = size =>
  (size === 'xsmall' && 100) ||
  (size === 'small' && 300) ||
  (size === 'medium' && 600) ||
  (size === 'large' && 900) ||
  (size === 'xlarge' && 1200) ||
  (size === 'xxlarge' && 1800) ||
  1200

const buildTransformString = ({ size = 'medium', ratio }) =>
  [
    ratio &&
      (typeof ratio == 'number'
        ? `ar_${Math.round(ratio * 100) / 100}`
        : `ar_${ratio}`),
    `w_${Math.round(pr * getDim(size))}`,
    ratio ? 'c_fill' : 'c_limit',
    'q_auto:good',
  ]
    .filter(Boolean)
    .join(',')

export const isCloudinary = (url: any) =>
  url && url_parse(url).hostname === 'res.cloudinary.com'

export const normalize = (url: string) => {
  const u = url && url_parse(url)

  if (!u || u.hostname !== 'res.cloudinary.com') return url

  const path = u.pathname.split('/').filter(Boolean)

  const iupload = path.findIndex(x => x === 'upload')

  path.splice(iupload + 1, path.length - 5)

  u.pathname = trimExtension('/' + path.join('/'))

  return url_format(u)
}

type Option = {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge',
  ratio?: '1:1' | '16:9' | '4:3' | number,
  extension?: 'jpg' | 'png',
}

export const createTransform = (options: Option = {}) => (url: string) => {
  const o = url && url_parse(url)

  if (!o || o.hostname !== 'res.cloudinary.com') return url

  // webp support
  {
    o.pathname = trimExtension(o.pathname)
    if (options.extension) o.pathname += `.${options.extension}`
    else if (supportsWebP) o.pathname += '.webp'
  }

  // tranform
  {
    const path = o.pathname.split('/').filter(Boolean)

    const iupload = path.findIndex(x => x === 'upload')

    path.splice(iupload + 1, path.length - 5, buildTransformString(options))

    o.pathname = path.join('/')
  }
  return url_format(o)
}
