import { StyleSheet } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'

import * as Colors from './colors'

const GlobalStyles = StyleSheet.create({
  screenWrapper: {
    paddingVertical: height(1),
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.PRIMARY_COLOR
  },
  cardWrapper: {
    backgroundColor: Colors.PRIMARY_COLOR,
    borderColor: Colors.SECONDARY_TEXT_COLOR
  },
  cardTitle: {
    fontSize: totalSize(3),
    color: Colors.PRIMARY_TEXT_COLOR
  },
  cardDetail: {
    padding: width(1),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardDetailText: {
    color: Colors.PRIMARY_TEXT_COLOR
  },
  reviewbodyContainer: {
    backgroundColor: Colors.PRIMARY_COLOR
  },
  h1Text: {
    textAlign: 'center',
    color: Colors.PRIMARY_TEXT_COLOR
  },
  input: {
    color: Colors.PRIMARY_TEXT_COLOR
  }
})

export {
  GlobalStyles,
  Colors
}
