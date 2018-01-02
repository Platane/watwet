import { h, Component } from 'preact'

type Layout = 'desktop' | 'mobile'

const getLayout = width => (width < 600 && 'mobile') || 'desktop'

export default C =>
  class MediaQueryInjector extends Component {
    state = { layout: 'desktop' }

    constructor() {
      super()
      this.state = {
        layout:
          typeof window === 'undefined'
            ? 'desktop'
            : getLayout(window.innerWidth),
      }
    }

    onResize = () => {
      const layout = getLayout(window.innerWidth)

      if (layout !== this.state.layout) this.setState({ layout })
    }

    componentDidMount() {
      if (typeof window !== 'undefined') {
        this.onResize()
        window.addEventListener('resize', this.onResize)
      }
    }
    componentWillUnmount() {
      if (typeof window !== 'undefined')
        window.removeEventListener('resize', this.onResize)
    }

    render() {
      return <C {...this.props} {...this.state} />
    }
  }
