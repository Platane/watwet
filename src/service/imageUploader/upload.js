export const uploadWithProgress = (
  url: string,
  body: string | ArrayBuffer,
  onProgress?: (x: number) => void
) =>
  new Promise((resolve, reject, onCancel) => {
    const xhr = new XMLHttpRequest()

    xhr.upload.onprogress = event =>
      onProgress(
        event.lengthComputable && event.total ? event.loaded / event.total : 0
      )

    xhr.onload = () => resolve(JSON.parse(xhr.response))

    xhr.onerror = err => reject(err)

    xhr.open('POST', url)

    xhr.send(body)

    onCancel && onCancel(() => xhr.abort())
  })
