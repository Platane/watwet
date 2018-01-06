import { h } from 'preact'
import styled from 'preact-emotion'

export const DropZone = ({ onChangeFile, fileName, style, className }) => (
  <Body style={style} className={className}>
    <Input
      key={fileName}
      onChange={e => e.target.files[0] && onChangeFile(e.target.files[0])}
      type="file"
      accept="image/*"
    />
  </Body>
)

const Body = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
`
const Input = styled.input`
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 2000px;
  height: 2000px;
  cursor: pointer;
`
