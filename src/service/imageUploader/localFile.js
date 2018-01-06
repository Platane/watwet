export const readFile = (file: File, type: 'dataUrl' | 'arrayBuffer') =>
  new Promise((resolve, reject) => {
    const fr = new FileReader()

    fr.onload = () => resolve(fr.result)

    fr.onerror = reject

    switch (type) {
      case 'dataUrl':
        return fr.readAsDataURL(file)

      case 'arrayBuffer':
        return fr.readAsArrayBuffer(file)

      default:
        return null
    }
  })

export const readFileAsDataUrl = (file: File): Promise<string> =>
  readFile(file, 'dataUrl')
export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> =>
  readFile(file, 'arrayBuffer')
