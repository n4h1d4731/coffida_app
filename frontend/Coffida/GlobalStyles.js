import { StyleSheet } from 'react-native'

module.exports = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#222222'
  },
  titleHeader: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold'
  },
  titleImage: {
    alignSelf: 'center',
    width: 250,
    height: 250
  },
  textInput: {
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginBottom: 10
  },
  headerButton: {
    padding: 10
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    marginTop: 15
  },
  secondaryButtonText: {
    textAlign: 'center',
    color: 'white'
  },
  textBoxTitle: {
    paddingTop: 10,
    color: '#fff'
  },
  textBoxInput: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    color: '#fff'
  }
})
