import React, { useState } from 'react'
import { Alert, Button, TextInput, ToastAndroid } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import GlobalStyles from '../GlobalStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'

const API_ENDPOINT = 'http://10.0.2.2:3333/api/1.0.0'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  const onLogin = () => {
    if (email === '') {
      ToastAndroid.show('Email must not be empty!', ToastAndroid.SHORT)
      return
    }
    if (password === '') {
      ToastAndroid.show('Password must not be empty!', ToastAndroid.SHORT)
      return
    }
    const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailValidator.test(email) !== true) {
      ToastAndroid.show('Invalid Email given!', ToastAndroid.SHORT)
      return
    }

    console.log(JSON.stringify({ email: email, password: password }))

    fetch(API_ENDPOINT + '/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(res => res.json())
      .then(async res => {
        try {
          if (!res.token) {
            Alert.alert('An error occured when logging in. Please try again.')
          } else {
            await AsyncStorage.setItem('@authKey', res.token)
            navigation.navigate('Locations')
          }
        } catch (e) {
          console.log('Failed to store authKey after login request')
          console.log(e)

          Alert.alert('An error occured when logging in. Please try again.')
        }
      }).catch(e => {
        Alert.alert(e)
      })
  }

  const onCreateAccount = () => {
    navigation.navigate('Signup')
  }

  return (
    <>
      <TextInput
        style={GlobalStyles.textInput}
        autoCapitalize='none'
        autoCompleteType='email'
        keyboardType='email-address'
        placeholder='Email'
        placeholderTextColor='#fff'
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        style={GlobalStyles.textInput}
        autoCapitalize='none'
        autoCompleteType='password'
        placeholder='Password'
        placeholderTextColor='#fff'
        secureTextEntry
        onChangeText={password => setPassword(password)}
      />
      <Button title='Login' onPress={onLogin} />
      <Button title='Create an account' onPress={onCreateAccount} />
    </>
  )
}

export default LoginForm
