export const genUid = () =>
  Array.from({ length: 10 })
    .reduce(
      sum =>
        sum +
        Math.random()
          .toString(36)
          .slice(2),
      ''
    )
    .slice(0, 32)

export const genIUid = () => 0 | (Math.random() * (1 << 30))
