export const readFile = (type: 'dataUrl' | 'arrayBuffer') => (
  file: File,
  onProgress?: (x: number) => void
) =>
  new Promise((resolve, reject) => {
    const fr = new FileReader()

    fr.onload = () => resolve(fr.result)

    fr.onerror = reject

    if (onProgress)
      fr.onprogress = event =>
        onProgress(
          event.lengthComputable && event.total ? event.loaded / event.total : 0
        )

    switch (type) {
      case 'dataUrl':
        return fr.readAsDataURL(file)

      case 'arrayBuffer':
        return fr.readAsArrayBuffer(file)
    }
  })

type ReadFileAsDataUrl = (
  file: File,
  onProgress?: (x: number) => void
) => Promise<string>
export const readFileAsDataUrl: ReadFileAsDataUrl = readFile('dataUrl')

type ReadFileAsArrayBuffer = (
  file: File,
  onProgress?: (x: number) => void
) => Promise<ArrayBuffer>

export const readFileAsArrayBuffer: ReadFileAsArrayBuffer = readFile(
  'arrayBuffer'
)
