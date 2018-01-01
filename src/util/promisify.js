export const promisify = (fn, ctx) => (...args) =>
  new Promise((resolve, reject) =>
    fn.call(
      ctx,
      ...args,
      (err, ...rest) => (err ? reject(err) : resolve(...rest))
    )
  )
