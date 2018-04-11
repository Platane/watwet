import { h, Component } from 'preact'

import { clampU } from '~/util/math'

const availableValues = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5, 4, 3, 2, 1]

const nextUp = (arr, x) => {
  for (let k = arr.length - 1; k => 0; k--) if (arr[k] > x) return arr[k]
  return arr[0]
}
const nextDown = (arr, x) => {
  for (let k = 0; k < arr.length; k++) if (arr[k] < x) return arr[k]
  return arr[arr.length - 1]
}

export const injectState = C =>
  class InputNumberState extends Component {
    state: State = { opened: false, value: Math.round(this.props.value * 100) }

    submit = () => {
      if (this.props.onChange)
        this.props.onChange(clampU(Math.round(this.state.value) / 100))
    }

    onFocus = () => this.setState({ opened: true })

    onBlur = () => this.setState({ opened: false }, this.submit)

    onSelect = value => this.setState({ value })

    onInput = e => this.setState({ value: e.target.value })

    onKeyDown = e => {
      switch (e.which) {
        // <arrow up>
        case 38: {
          this.onSelect(nextUp(availableValues, +this.state.value))
          e.preventDefault()
          break
        }

        // <arrow down>
        case 40: {
          this.onSelect(nextDown(availableValues, +this.state.value))
          e.preventDefault()
          break
        }

        // <enter>
        case 9:
        // <tab>
        case 13: {
          e.target.blur()
          break
        }
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.value != nextProps.value) {
        this.setState({ value: Math.round(nextProps.value * 100) })
      }
    }

    render() {
      return (
        <C
          {...this.props}
          {...this.state}
          availableValues={availableValues}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onInput={this.onInput}
          onSelect={this.onSelect}
          onKeyDown={this.onKeyDown}
        />
      )
    }
  }
