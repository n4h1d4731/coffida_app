import React from 'react'
import { View, Text, Image } from 'react-native'

import SignInForm from './sign-in-form'

import GlobalStyles from '../GlobalStyles'

export default function SignIn ({ navigation }) {
  return (
    <View style={GlobalStyles.contentWrapper}>
      <View style={{ flex: 0.7 }}>
        <Text style={GlobalStyles.titleHeader}>CoffiDa</Text>
        <Image source={require('../res/img/coffee-cup.png')} style={GlobalStyles.titleImage} />
      </View>
      <View style={{ flex: 0.3 }}>
        <SignInForm />
      </View>
    </View>
  )
}
