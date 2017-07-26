import React, { Component, PropTypes } from 'react'
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  Text
} from 'react-native'
import ToastStyles from './ToastStyles'

const noop = () => 0

class Toast extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ]).isRequired,
    styles: PropTypes.object,
    duration: PropTypes.number,
    height: PropTypes.number,
    onShow: PropTypes.func,
    onHide: PropTypes.func
  }

  static defaultProps = {
    styles: ToastStyles.info,
    duration: 3000,
    height: 100,
    onShow: noop,
    onHide: noop
  }

  state = { animatedValue: new Animated.Value(0), timeoutId: null }

  componentWillMount () {
    this.showToast()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.id !== nextProps.id) {
      this.showToast()
    }
  }

  componentWillUnmount () {
    const { timeoutId } = this.state;
    clearTimeout(timeoutId)
  }

  showToast () {
    const animatedValue = new Animated.Value(0)

    this.setState({ animatedValue })

    Animated
      .timing(animatedValue, { toValue: 1, duration: 350 })
      .start()

    const { duration, onShow } = this.props
    const timeoutId = setTimeout(() => this.hideToast(), duration + 350)

    this.setState({ timeoutId }, onShow)
  }

  hideToast = () => {
    const { timeoutId, animatedValue } = this.state

    clearTimeout(timeoutId)

    Animated
      .timing(animatedValue, { toValue: 0, duration: 350 })
      .start()

    setTimeout(this.props.onHide, 350)
  }

  onPress = () => this.hideToast()

  render () {
    const y = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-this.props.height, 0]
    })

    const { styles, text } = this.props
    let textContent;

    if (Object.prototype.toString.call(text) === '[object String]') {
      textContent = (
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    } else if (Object.prototype.toString.call(text) === '[object Function]') {
      textContent = text({ hide: this.hideToast });
    } else {
      textContent = (
        <TouchableWithoutFeedback onPress={this.onPress}>
          {text}
        </TouchableWithoutFeedback>
      )
    }



    return (
      <Animated.View style={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 9999,
        transform: [{ translateY: y }]
      }}>
        {textContent}
      </Animated.View>
    )
  }
}

export default Toast
