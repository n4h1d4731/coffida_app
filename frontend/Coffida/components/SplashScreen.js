import React from 'react'
import { Image, Text, View } from 'react-native'

import GlobalStyles from '../styles/GlobalStyles'

export default function SplashScreen () {
  return (
    <View style={GlobalStyles.contentWrapper}>
      <View style={{ flex: 0.5 }}>
        <Text style={GlobalStyles.titleHeader}>CoffiDa</Text>
        <Image source={require('../res/img/coffee-cup.png')} style={GlobalStyles.titleImage} />
      </View>
    </View>
  )
}
