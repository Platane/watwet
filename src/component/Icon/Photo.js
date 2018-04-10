import { h } from 'preact'

export const paths = [
  'M534.8 68.2a44 44 0 0 0-32.3-13.4H45.7a44 44 0 0 0-32.3 13.4A44 44 0 0 0 0 100.5v347.2a44 44 0 0 0 13.4 32.2 44 44 0 0 0 32.3 13.5h456.8a44 44 0 0 0 32.3-13.5 44 44 0 0 0 13.4-32.2V100.5a44 44 0 0 0-13.5-32.3zm-23.2 379.5c0 2.5-.9 4.6-2.7 6.4a8.8 8.8 0 0 1-6.4 2.7H45.7c-2.5 0-4.6-.9-6.4-2.7a8.8 8.8 0 0 1-2.8-6.4V100.5c0-2.5 1-4.6 2.8-6.4 1.8-1.8 4-2.7 6.4-2.7h456.8c2.5 0 4.6.9 6.4 2.7 1.8 1.8 2.7 4 2.7 6.4v347.2z',
  'M128 237.5c15.1 0 28-5.3 38.7-16a52.9 52.9 0 0 0 16-38.8c0-15.2-5.3-28.1-16-38.8a52.9 52.9 0 0 0-38.8-16 52.9 52.9 0 0 0-38.8 16 52.9 52.9 0 0 0-16 38.8c0 15.3 5.3 28.2 16 38.9a52.9 52.9 0 0 0 38.8 16zm82.1 82.3l-45.6-45.7-91.4 91.3v54.9h402V292.4L356.3 173.6z',
]

export const box = [0, 54, 548.2, 440]

export const Photo = ({ color, ...props }) => (
  <svg viewBox={box.join(' ')} {...props}>
    <path fill={color} d={paths[0]} />
    <path fill={color} d={paths[1]} />
  </svg>
)