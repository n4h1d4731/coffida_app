import { StyleSheet } from 'react-native'
import { totalSize } from 'react-native-dimension'

module.exports = StyleSheet.create({
  wrapper: {
    marginTop: 5,
    marginBottom: 5,
    padding: 2,
    backgroundColor: '#333'
  },
  header: {
    fontSize: totalSize(3),
    color: '#fff',
    fontWeight: 'bold'
  },
  text: {
    fontSize: totalSize(2),
    color: '#fff'
  }
})
