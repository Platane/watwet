import { h, Component } from 'preact'

export default C =>
  class createHabitatState extends Component {
    state = { info: {} }

    onChange = info => this.setState({ info: { ...this.state.info, ...info } })

    onSubmit = () =>
      this.props.createHabitat(this.props.siteId, {
        info: this.state.info,
      })

    render() {
      return (
        <C
          {...this.props}
          {...this.state}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
        />
      )
    }
  }
