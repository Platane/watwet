import { h } from 'preact'

export const paths = [
  'M1024 1375v-190q0-14-9-23t-23-10H800q-13 0-22 10t-10 23v190q0 14 10 24t22 9h192q13 0 23-9t9-24zm-2-374l18-459q0-12-10-19-13-11-24-11H786q-11 0-24 11-10 7-10 21l17 457q0 10 10 17t24 6h185q14 0 24-6t10-17zm-14-934l768 1408q35 63-2 126-17 29-46 46t-64 17H128q-34 0-63-17t-47-46q-37-63-2-126L784 67q17-31 47-49t65-18 65 18 47 49z',
]

export const box = [0, 0, 1792, 1792]

export const Warning = ({ color, ...props }) => (
  <svg viewBox={box.join(' ')} {...props}>
    <path fill={color} d={paths[0]} />
  </svg>
)
