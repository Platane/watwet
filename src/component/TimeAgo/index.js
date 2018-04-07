import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { createTransform } from '~/service/cloudinary'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

const intervals = [
  ...Array.from({ length: 45 }).map((_, x) => 0.5 + x),
  ...Array.from({ length: 23 }).map((_, x) => (1 + x) * 60),
  ...Array.from({ length: 30 }).map((_, x) => (1 + x) * 24 * 60),
].map(x => x * 60 * 1000)

const getNextTic = (date): number => {
  const delta = Math.max(0, Date.now() - new Date(date).getTime())

  for (let k = 0; k < intervals.length; k++)
    if (delta <= intervals[k]) return intervals[k]

  return 9999999999
}

export class TimeAgo extends Component {
  _killtimeout = null

  shouldComponentUpdate(props) {
    return props.date != this.props.date
  }

  _update = () => this.forceUpdate()

  render() {
    clearTimeout(this._killtimeout)
    const nextTic = getNextTic(this.props.date)
    this._killtimeout = setTimeout(this._update, nextTic + 10)

    return <span>{distanceInWordsToNow(this.props.date)}</span>
  }
}
