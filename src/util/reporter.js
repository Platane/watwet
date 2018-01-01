export const error = (err: any) => {
  const Raven = typeof window !== 'undefined' && window.Raven

  if (Raven) Raven.captureException(err)
  else console.error(err)
}
