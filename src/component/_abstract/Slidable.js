import React from 'react'

type Param = {
  bottom: number,
  left: number,
  right: number,
  top: number,
  kx: number,
  ky: number,
  x: number,
  y: number,
}

export type Props = {
  downFn: (p: Param, event: Event) => void,
  moveFn: (p: Param, event: Event) => void,
  upFn: (p: Param, event: Event) => void,
}

const getPointerX = (event: MouseEvent | TouchEvent): number =>
  event.targetTouches ? event.targetTouches[0].clientX : event.clientX

const getPointerY = (event: MouseEvent | TouchEvent): number =>
  event.targetTouches ? event.targetTouches[0].clientY : event.clientY

export class Slidable extends React.Component<*, *> {
  container: null | any = null

  getSlideParam(event: MouseEvent | TouchEvent): Param {
    if (!this.container) throw new Error()

    const { bottom, top, right, left } = this.container.getBoundingClientRect()

    const x = getPointerX(event)
    const y = getPointerY(event)

    const kx = (x - left) / (right - left)
    const ky = (y - top) / (bottom - top)

    return { bottom, top, right, left, kx, ky, x, y }
  }

  _down = (event: MouseEvent | TouchEvent) => {
    if (this.props.downFn) this.props.downFn(this.getSlideParam(event), event)

    event.preventDefault()
    event.stopPropagation()

    window.removeEventListener('mousemove', this._move)
    window.removeEventListener('touchmove', this._move)
    window.removeEventListener('mouseup', this._up)
    window.removeEventListener('touchend', this._up)
    window.removeEventListener('touchcancel', this._up)
    window.addEventListener('mousemove', this._move)
    window.addEventListener('touchmove', this._move)
    window.addEventListener('mouseup', this._up)
    window.addEventListener('touchend', this._up)
    window.addEventListener('touchcancel', this._up)
  }

  _move = (event: MouseEvent | TouchEvent) => {
    if (this.props.moveFn) this.props.moveFn(this.getSlideParam(event), event)
  }

  _up = (event: MouseEvent | TouchEvent) => {
    if (this.props.upFn) this.props.upFn(this.getSlideParam(event), event)

    window.removeEventListener('mousemove', this._move)
    window.removeEventListener('touchmove', this._move)
    window.removeEventListener('mouseup', this._up)
    window.removeEventListener('touchend', this._up)
    window.removeEventListener('touchcancel', this._up)
  }

  componentWillUnmount() {
    if (typeof window === 'undefined') return

    window.removeEventListener('mousemove', this._move)
    window.removeEventListener('touchmove', this._move)
    window.removeEventListener('mouseup', this._up)
    window.removeEventListener('touchend', this._up)
    window.removeEventListener('touchcancel', this._up)
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={this.props.style}
        onMouseDown={this._down}
        onTouchStart={this._down}
        ref={ref => (this.container = ref)}
      >
        {this.props.children}
      </div>
    )
  }
}
