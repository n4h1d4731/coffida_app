import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import LoginForm from './login-form'

import GlobalStyles from '../GlobalStyles'

const Login = ({ navigation }) => {
  const [authKey, setAuthKey] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('@authKey')
    .then(res => {
      if (res !== null) {
        setAuthKey(res)
        navigation.navigate('Locations', { authKey: authKey })
      }
    }).catch(e => {
      console.log('Error loading auth key from local storage...')
      console.log(e)
    })
  })

  return (
    <View style={GlobalStyles.contentWrapper}>
      <View style={{ flex: 0.7 }}>
        <Text style={GlobalStyles.titleHeader}>CoffiDa</Text>
        <Image source={require('../res/img/coffee-cup.png')} style={GlobalStyles.titleImage} />
      </View>
      <View style={{ flex: 0.3 }}>
        <LoginForm />
      </View>
    </View>
  )
}

export default Login
