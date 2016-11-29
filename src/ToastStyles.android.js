import { StyleSheet } from 'react-native'

export default {
  info: StyleSheet.create({
    container: {
      backgroundColor: '#2487DB',
      paddingTop: 15,
      paddingRight: 15,
      paddingBottom: 15,
      paddingLeft: 15
    },
    text: {
      color: '#ffffff',
      fontWeight: 'bold'
    }
  }),
  success: StyleSheet.create({
    container: {
      backgroundColor: 'green',
      paddingTop: 15,
      paddingRight: 15,
      paddingBottom: 15,
      paddingLeft: 15
    },
    text: {
      color: '#ffffff',
      fontWeight: 'bold'
    }
  }),
  warning: StyleSheet.create({
    container: {
      backgroundColor: '#ec971f',
      paddingTop: 15,
      paddingRight: 15,
      paddingBottom: 15,
      paddingLeft: 15
    },
    text: {
      color: '#ffffff',
      fontWeight: 'bold'
    }
  }),
  error: StyleSheet.create({
    container: {
      backgroundColor: 'red',
      paddingTop: 15,
      paddingRight: 15,
      paddingBottom: 15,
      paddingLeft: 15
    },
    text: {
      color: '#ffffff',
      fontWeight: 'bold'
    }
  })
}
