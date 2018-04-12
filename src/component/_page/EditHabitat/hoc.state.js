import { h, Component } from 'preact'

export default C =>
  class createHabitatState extends Component {
    state = {
      uploading: false,
      info: (this.props.habitat && this.props.habitat.info) || {},
    }

    onChange = info =>
      this.setState({
        uploading: this.state.uploading && !info.picture_url,
        info: { ...this.state.info, ...info },
      })

    onStartUpload = () => this.setState({ uploading: true })

    onSubmit = e => {
      e.preventDefault()
      this.props.updateHabitat({ ...this.props.habitat, info: this.state.info })
    }

    onRemove = () =>
      this.props.removeHabitat(this.props.habitat.siteId, this.props.habitat.id)

    componentWillReceiveProps(nextProps) {
      if (this.props.habitat != nextProps.habitat)
        this.setState({
          info: (nextProps.habitat && nextProps.habitat.info) || {},
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
          onRemove={this.onRemove}
          onChange={this.onChange}
          onStartUpload={this.onStartUpload}
        />
      )
    }
  }
