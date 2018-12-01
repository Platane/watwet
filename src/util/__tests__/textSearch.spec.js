import { splitWithPattern } from '../textSearch'

it('splitWithPattern should split with a simple char as pattern', () => {
  expect(splitWithPattern('aaabaaba', 'b')).toEqual([
    { text: 'aaa', type: 'normal' },
    { text: 'b', type: 'match' },
    { text: 'aa', type: 'normal' },
    { text: 'b', type: 'match' },
    { text: 'a', type: 'normal' },
  ])
})

it('splitWithPattern should split correctly at the limits', () => {
  expect(splitWithPattern('baabab', 'b')).toEqual([
    { text: 'b', type: 'match' },
    { text: 'aa', type: 'normal' },
    { text: 'b', type: 'match' },
    { text: 'a', type: 'normal' },
    { text: 'b', type: 'match' },
  ])

  expect(splitWithPattern('baaab', 'b')).toEqual([
    { text: 'b', type: 'match' },
    { text: 'aaa', type: 'normal' },
    { text: 'b', type: 'match' },
  ])

  expect(splitWithPattern('b', 'b')).toEqual([{ text: 'b', type: 'match' }])
})

it('splitWithPattern should split without case sensitivity, but ouput case sensitive splits', () => {
  expect(splitWithPattern('aAaABcaAaABaca', 'BC')).toEqual([
    { text: 'aAaA', type: 'normal' },
    { text: 'Bc', type: 'match' },
    { text: 'aAaABaca', type: 'normal' },
  ])
})
