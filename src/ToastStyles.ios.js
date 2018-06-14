import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

const IS_IPHONE_X = Dimensions.get('window').height === 812;

export const base = {
  container: {
    paddingTop: IS_IPHONE_X ? 45 : 25,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
}

export default {
  info: StyleSheet.create({
    container: StyleSheet.flatten([base.container, { backgroundColor: '#2487DB' }]),
    text: base.text
  }),
  success: StyleSheet.create({
    container: StyleSheet.flatten([base.container, { backgroundColor: 'green' }]),
    text: base.text
  }),
  warning: StyleSheet.create({
    container: StyleSheet.flatten([base.container, { backgroundColor: '#ec971f' }]),
    text: base.text
  }),
  error: StyleSheet.create({
    container: StyleSheet.flatten([base.container, { backgroundColor: 'red' }]),
    text: base.text
  })
}
