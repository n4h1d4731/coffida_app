import React from 'react'
import { Image } from 'react-native'
import { Text } from 'react-native-elements'

import { GlobalStyles } from '_styles'
import { height, width } from 'react-native-dimension'

export default function Banner () {
  return (
    <>
      <Text h1 style={GlobalStyles.h1Text}>CoffiDa</Text>
      <Image
        source={require('_assets/images/coffee-cup.png')}
        style={{
          width: width(80) < height(80) ? width(80) : height(80),
          height: undefined,
          aspectRatio: (16 / 9),
          resizeMode: 'contain',
          alignSelf: 'center'
        }}
      />
    </>
  )
}
