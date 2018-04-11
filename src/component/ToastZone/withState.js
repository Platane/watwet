import { h, Component } from 'preact'

const DELAY = 6000

export default C =>
  class ToastController extends Component {
    _killtimeout = null

    state = { closed: {} }

    close = id =>
      this.setState({ closed: { ...this.state.closed, [id]: true } })

    componentWillUnmount() {
      clearTimeout(this._killtimeout)
    }

    update = () => this.forceUpdate()

    render(props, state) {
      const dateLimit = Date.now() - DELAY

      const toDisplay = props.notification
        .filter(x => x.date > dateLimit)
        .filter(x => !this.state.closed[x.id])

      if (toDisplay.length) {
        const delta =
          toDisplay[toDisplay.length - 1].date + DELAY + 100 - Date.now()

        clearTimeout(this._killtimeout)
        this._killtimeout = setTimeout(this.update, Math.max(1, delta))
      }

      return (
        <C {...props} {...state} toDisplay={toDisplay} close={this.close} />
      )
    }
  }
