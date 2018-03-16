import { h } from 'preact'
import styled from 'preact-emotion'

import { DropZone as DropZone_ } from '~/component/DropZone'
import { Image as Image_ } from '~/component/Image'

export const InputImage = ({
  step,
  value,
  dataUrl,
  file,
  progress,
  onChangeFile,
  style,
  className,
}) => (
  <Body style={style} className={className}>
    {step === 'selectFile' && value && <Image src={value} />}

    {step === 'uploading' && dataUrl && <Image src={dataUrl} />}

    {(step === 'selectFile' || step === 'uploading') && (
      <DropZone onChangeFile={onChangeFile} fileName={file && file.name} />
    )}

    {step === 'uploading' && (
      <span>{`uploading ${Math.round(progress * 100)}%`}</span>
    )}
  </Body>
)

const DropZone = styled(DropZone_)`
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Body = styled.div`
  width: 280px;
  height: 180px;
  position: relative;
  border: solid 1px #000;
`

const Image = styled(Image_)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
