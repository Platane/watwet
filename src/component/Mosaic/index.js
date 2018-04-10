import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { Image } from '~/component/Image'
import { grey } from '~/component/_abstract/palette'

const getLayout = n => {
  switch (Math.min(n, 4)) {
    case 0:
      return []
    case 1:
      return [{ width: '100%', height: '100%' }]
    case 2:
      return [
        { width: '50%', height: '100%' },
        { width: '50%', height: '100%' },
      ]
    case 3:
      return [
        { width: '100%', height: '50%' },
        { width: '50%', height: '50%' },
        { width: '50%', height: '50%' },
      ]
    case 4:
      return [
        { width: '50%', height: '50%' },
        { width: '50%', height: '50%' },
        { width: '50%', height: '50%' },
        { width: '50%', height: '50%' },
      ]
  }
}

export const Mosaic = ({ srcs, ...props }) => (
  <Container {...props}>
    {getLayout(srcs.length).map((style, i) => (
      <Fragment key={i} style={style} src={srcs[i]} size="small" />
    ))}
  </Container>
)

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${grey};
`

const Fragment = styled(Image)``
