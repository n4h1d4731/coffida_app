import React from 'react'
import { View } from 'react-native'

// import required components
import Banner from '_components/banner'

// import required styles
import { GlobalStyles } from '_styles'

export default function AuthLoadingScreen () {
  return (
    <View style={[GlobalStyles.screenWrapper, { justifyContent: 'space-around' }]}>
      <Banner />
    </View>
  )
}
