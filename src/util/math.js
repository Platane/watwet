export const clamp = (min: number, max: number) => (x: number) =>
  Math.min(max, Math.max(min, x))

export const clampU = clamp(0, 1)

export const lerp = (min: number, max: number) => (x: number) =>
  (1 - x) * min + x * max

export const proj = (min: number, max: number) => (x: number) =>
  (x - min) / (max - min)

// project in the interval, them clamp to unit
export const cprojU = (min: number, max: number) => (x: number) =>
  clampU(proj(min, max)(x))

// ease-in-out function
export const ease = (alpha: number) => (x: number) =>
  Math.pow(x, alpha) / (Math.pow(x, alpha) + Math.pow(1 - x, alpha))
