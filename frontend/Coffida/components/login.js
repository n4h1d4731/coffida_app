import React from 'react'
import { View, Text, Image } from 'react-native'

import LoginForm from './LoginForm'

import GlobalStyles from '../GlobalStyles'

const Login = () => {
  const [authKey, setAuthKey] = useState('')

  try {
    const res = AsyncStorage.getItem('@authKey')
    if (res !== null) {
      setAuthKey(res)
    }
  } catch (e) {
    console.log('Error retrieving local auth key')
    console.log(e)
  }
  
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
