export const compose = (...fn) => input =>
  fn.reduceRight((x, fn) => fn(x), input)
