import { uploadWithProgress } from './upload'
import { readFileAsArrayBuffer, readFileAsDataUrl } from './localFile'

import {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_UPLOAD_PRESET,
} from '~/config'

const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload?api_key=${CLOUDINARY_API_KEY}&upload_preset=${CLOUDINARY_UPLOAD_PRESET}`

export const uploadFileImage = async (
  file: File,
  onProgress?: (x: number) => void
) => {
  const fd = new FormData()

  fd.append('file', file)

  const { secure_url } = await uploadWithProgress(url, fd, onProgress)

  return secure_url
}
