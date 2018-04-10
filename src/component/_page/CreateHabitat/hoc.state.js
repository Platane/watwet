import { h, Component } from 'preact'

export default C =>
  class createHabitatState extends Component {
    state = { uploading: false, info: {} }

    onChange = info =>
      this.setState({
        uploading: this.state.uploading && !info.picture_url,
        info: { ...this.state.info, ...info },
      })

    onStartUpload = () => this.setState({ uploading: true })

    onSubmit = e => {
      e.preventDefault()
      this.props.createHabitat(this.props.siteId, {
        info: this.state.info,
      })
    }

    render() {
      return (
        <C
          {...this.props}
          {...this.state}
          onSubmit={
            this.state.info.codeCorineBiotipe &&
            !this.state.uploading &&
            this.onSubmit
          }
          onChange={this.onChange}
          onStartUpload={this.onStartUpload}
        />
      )
    }
  }
