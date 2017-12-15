import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Toast from './Toast'

const messageType = PropTypes.shape({
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  styles: PropTypes.object,
  duration: PropTypes.number,
  height: PropTypes.number
})

const noop = () => 0

// Inspired by https://github.com/dabit3/react-native-toasts
class Toaster extends Component {
  static propTypes = {
    message: PropTypes.oneOfType([messageType, PropTypes.arrayOf(messageType)]),
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    onPress: PropTypes.func
  }

  static defaultProps = {
    onShow: noop,
    onHide: noop,
    onPress: noop
  }

  constructor (props) {
    super(props)

    let messages = []

    if (props.message) {
      messages = this.cloneWithId(props.message)
      messages = Array.isArray(messages) ? messages : [messages]
    }

    this.state = { messages }
  }

  cloneWithId (obj) {
    if (Array.isArray(obj)) {
      return obj.map(this.cloneWithId)
    }

    return Object.assign({ id: Math.random().toString(36) }, obj)
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.message) return
    const message = this.cloneWithId(nextProps.message)
    this.setState({ messages: this.state.messages.concat(message) })
  }

  onShow = () => {
    const message = this.state.messages[0]

    if (message.onShow) {
      message.onShow()
    }

    this.props.onShow(message)
  }

  onHide = () => {
    const message = this.state.messages[0]

    this.setState({ messages: this.state.messages.slice(1) }, () => {
      if (message.onHide) {
        message.onHide()
      }

      this.props.onHide(message)
    })
  }

  onPress = () => {
    const message = this.state.messages[0]

    if (message.onPress) {
      message.onPress()
    }

    this.props.onPress(message)
  }

  render () {
    const { messages } = this.state
    if (!messages.length) return null
    return <Toast {...messages[0]} onShow={this.onShow} onHide={this.onHide} onPress={this.onPress} />
  }
}

export default Toaster
