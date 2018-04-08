import React from 'react'
import { h, Component } from 'preact'

const isExternalUrl = url => !!url.match(/^https?:\/\//)

export class Link extends Component {
  linkClicked = e => {
    if (
      e.currentTarget.nodeName === 'A' &&
      (e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        (e.nativeEvent && e.nativeEvent.which === 2))
    ) {
      // ignore click for new tab / new window behavior
      return
    }

    if (isExternalUrl(this.props.href)) return

    e.preventDefault()

    window.scrollTo(0, 0)
    document.body.focus()

    this.props.goTo(this.props.href, this.props.query, this.props.hash)
  }

  render() {
    // return this.props.children

    const child = React.Children.only(this.props.children)
    const props = {
      href: this.props.href,
      target: this.props.target,
      onClick: this.linkClicked,
    }

    return React.cloneElement(child, props)
  }
}
