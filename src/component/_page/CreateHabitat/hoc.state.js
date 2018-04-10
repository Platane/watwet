import { h, Component } from 'preact'

export default C =>
  class createHabitatState extends Component {
    state = {}

    onChange = info => this.setState(info)

    onSubmit = e => {
      e.preventDefault()
      this.props.createHabitat(this.props.siteId, {
        info: this.state,
      })
    }

    render() {
      return (
        <C
          {...this.props}
          info={this.state}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
        />
      )
    }
  }
