import { h, Component } from 'preact'

export default C =>
  class Stateful extends Component {
    state: { opened: false }

    open = () => this.setState({ opened: true })

    close = () => this.setState({ opened: false })

    render() {
      return (
        <C
          {...this.props}
          {...this.state}
          open={this.open}
          close={this.close}
        />
      )
    }
  }
