export const wait = (delay: number = 0): Promise<void> =>
  new Promise((resolve, reject, onCancel) => {
    const killTimeout = setTimeout(resolve, delay)

    onCancel && onCancel(clearTimeout(killTimeout))
  })
