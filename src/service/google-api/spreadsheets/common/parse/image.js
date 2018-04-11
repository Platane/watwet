import { createTransform, normalize } from '~/service/cloudinary'

export const parseImage = (x: string) =>
  normalize(((x || '').match(/IMAGE\("(.*)"\)/) || [])[1])

const tranform = createTransform({
  extension: 'jpg',
  ratio: '4:3',
  size: 'xlarge',
})
export const formatImage = (picture_url: string) =>
  `=IMAGE("${tranform(picture_url)}")`
