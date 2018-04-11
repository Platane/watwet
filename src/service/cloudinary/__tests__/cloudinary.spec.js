import { normalize, createTransform } from '../index'

it('transform should be idempotent', () => {
  const transform = createTransform({ size: 'medium' })

  const url =
    'http://res.cloudinary.com/dztf8jekp/image/upload/v1523451957/fjzvuniznnt6nemfug4h.jpg'

  const a = transform(url)
  const b = transform(transform(transform(url)))

  expect(a).toBe(b)
})

it('normalize should be idempotent', () => {
  const url =
    'http://res.cloudinary.com/dztf8jekp/image/upload/c_scale,e_boomerang,h_1103,q_49,r_14/a_157/v1523451957/fjzvuniznnt6nemfug4h.jpg'

  const a = normalize(url)
  const b = normalize(normalize(normalize(url)))

  expect(a).toBe(b)
})

it('transform / normalize should be identity', () => {
  const transform = createTransform({ size: 'medium' })

  const url =
    'http://res.cloudinary.com/dztf8jekp/image/upload/v1523451957/fjzvuniznnt6nemfug4h'

  const a = normalize(transform(url))
  const b = normalize(transform(normalize(transform(url))))

  expect(a).toBe(url)
  expect(b).toBe(url)
})
