import { h, Component } from 'preact'
import { uploadFileImage } from '~/service/imageUploader'
import { readFileAsDataUrl } from '~/service/imageUploader/localFile'

export type State =
  | {
      step: 'selectFile',
    }
  | {
      dataUrl: string | null,
      step: 'uploading',
      file: File,
      progress: number,
    }

export const injectState = C =>
  class ImageInputState extends Component {
    state: State = { step: 'selectFile' }

    onChangeFile = file => {
      if (this.props.onStartUpload) this.props.onStartUpload()

      this.setState({ step: 'uploading', file, progress: 0, dataUrl: null })

      readFileAsDataUrl(file).then(dataUrl => {
        if (file !== this.state.file) return
        this.setState({ step: 'uploading', dataUrl })
      })

      const onProgress = progress => {
        if (file !== this.state.file) return
        this.setState({ progress })
      }

      uploadFileImage(this.state.file, onProgress).then(value => {
        if (file !== this.state.file) return
        if (this.props.onChange) this.props.onChange(value)
        this.setState({ step: 'selectFile', file: null })
      })
    }

    render() {
      return (
        <C
          {...this.props}
          {...this.state}
          onSubmit={this.onSubmit}
          onChangeFile={this.onChangeFile}
        />
      )
    }
  }
