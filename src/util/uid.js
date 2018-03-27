export const genUid = () =>
  Math.random()
    .toString(16)
    .slice(2)

export const genIUid = () => 0 | (Math.random() * (1 << 30))
