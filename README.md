# react-native-toaster

Simple top-pop toast feedback messages for React Native.

## Example

```js
import React, { Component } from 'react'
import { View } from 'react-native'
import Toaster, { ToastStyles } from 'react-native-toaster'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { message: null }

    const messages = [
      { text: 'FYI' },
      { text: 'Hooray!', styles: ToastStyles.success },
      { text: 'Eek', styles: ToastStyles.warning },
      { text: 'Oh noe!', styles: ToastStyles.error }
    ]

    // Send each message 1 second apart
    messages.forEach((message, i) => {
      setTimeout(() => this.setState({ message }), i * 1000)
    })
  }

  render () {
    return (
      <View>
        <Toaster message={this.state.message} />
      </View>
    )
  }
}
```
