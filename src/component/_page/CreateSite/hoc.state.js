import { h, Component } from 'preact'

export default C =>
  class createSiteState extends Component {
    state = { name: '', description: '' }

    onChange = site => this.setState({ ...site })

    onSubmit = () => this.props.createSite(this.state)

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
