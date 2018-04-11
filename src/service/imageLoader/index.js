export const getDimension = async (src: string) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src

    if (img.naturalWidth)
      return resolve({ width: img.naturalWidth, height: img.naturalHeight })

    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight })

    img.onerror = reject
  })

export const load = getDimension
