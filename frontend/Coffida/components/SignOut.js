import React from 'react'
import { Image, Text, View } from 'react-native'

import { useAuth } from '../contexts/AuthProvider'

import GlobalStyles from '../styles/GlobalStyles'

export default function SignOut ({ navigation }) {
  const { authFunctions } = useAuth()

  React.useEffect(() => {
    authFunctions.signOut()
    navigation.navigate('Home')
  })

  return (
    <View style={GlobalStyles.contentWrapper}>
      <View style={{ flex: 0.5 }}>
        <Text style={GlobalStyles.titleHeader}>CoffiDa</Text>
        <Image source={require('../res/img/coffee-cup.png')} style={GlobalStyles.titleImage} />
      </View>
      <Text style={{ color: '#fff', textAlign: 'center' }}>Signing Out...</Text>
    </View>
  )
}
