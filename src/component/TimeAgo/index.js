import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { createTransform } from '~/service/cloudinary'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

/**
 * as we don't want to update the label every second,
 * only update for a certain number of deltas
 * in ms,
 *    - every minute for the first 45 min
 *    - every hours for the first 23 hours
 *    - every day for the first 30 days
 */
const deltas = [
  ...Array.from({ length: 45 }).map((_, x) => 0.5 + x),
  ...Array.from({ length: 23 }).map((_, x) => (1 + x) * 60),
  ...Array.from({ length: 30 }).map((_, x) => (1 + x) * 24 * 60),
].map(x => x * 60 * 1000)

const getNextTic = (date): number => {
  const delta = Math.max(0, Date.now() - new Date(date).getTime())

  for (let k = 0; k < deltas.length; k++)
    if (delta <= deltas[k]) return deltas[k]

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
