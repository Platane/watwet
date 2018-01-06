import { h, Component } from 'preact'

export default C =>
  class createHabitatState extends Component {
    state = { info: {} }

    onChange = info => this.setState({ info })

    onSubmit = () => this.props.createHabitat({ info })

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
