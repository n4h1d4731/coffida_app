import React, { useEffect } from 'react'
import { Alert, View, Text, BackHandler } from 'react-native'

const Location = ({ navigation }) => {
  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault()

        Alert.alert(
          'Quit App?',
          'Are you sure you want to quit the application',
          [
            {
              text: 'No',
              style: 'cancel',
              onPress: () => {}
            },
            {
              text: 'Yes',
              style: 'destructive',
              onPress: () => { BackHandler.exitApp() }
            }
          ]
        )
      }),
    [navigation]
  )

  return (
    <View>
      <Text>Hello World!</Text>
    </View>
  )
}

export default Location
