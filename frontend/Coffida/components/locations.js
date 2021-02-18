import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

import HeaderRightOptions from './header-right-options'

import GlobalStyles from '../GlobalStyles'

export default function Locations ({ navigation }) {
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // TODO: load all location data here
  }, [isLoading])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightOptions />
      )
    })
  })

  return (
    <View style={GlobalStyles.contentWrapper}>
      {isLoading ? (<ActivityIndicator size='large' color='#fff' />) : (<Text>Hello World!</Text>)}
    </View>
  )
}
