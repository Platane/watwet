import React from 'react'
import { h, Component } from 'preact'
import { PATHNAME_BASE } from '~/config'

const isExternalUrl = url => !!url.match(/^https?:\/\//)

const prefix = href =>
  '/' +
  [...PATHNAME_BASE.split('/'), ...href.split('/')].filter(Boolean).join('/')

const normalize = href => (isExternalUrl(href) ? href : prefix(href))

export class Link extends Component {
  linkClicked = e => {
    this.props.onClick && this.props.onClick(e)

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
    const props = {
      href: normalize(this.props.href),
      target: this.props.target,
      onClick: this.linkClicked,
    }

    // const child = React.Children.only(this.props.children)
    // return React.cloneElement(child, props)

    Object.assign(this.props.children[0].attributes, props)

    return this.props.children[0]
  }
}
