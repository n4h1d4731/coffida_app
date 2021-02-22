import { StyleSheet } from 'react-native'
import { totalSize, width } from 'react-native-dimension'

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
  header2: {
    fontSize: totalSize(2),
    color: '#fff',
    fontWeight: 'bold'
  },
  text: {
    fontSize: totalSize(1.75),
    color: '#fff'
  },
  image: {
    width: width(100),
    height: undefined,
    aspectRatio: (16 / 9),
    resizeMode: 'center'
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: totalSize(1)
  }
})
