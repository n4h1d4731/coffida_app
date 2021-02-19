import React from 'react'
import { Button, Pressable, Text, TextInput, ToastAndroid } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { useAuthUpdate } from '../contexts/AuthProvider'

import GlobalStyles from '../GlobalStyles'

export default function SignInForm () {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const navigation = useNavigation()
  const authUpdate = useAuthUpdate()

  const onSignIn = () => {
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

    authUpdate.signIn({ email, password })
  }

  const onCreateAccount = () => {
    navigation.navigate('SignUp')
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
      <Button title='Login' onPress={onSignIn} />
      <Pressable style={GlobalStyles.secondaryButton} onPress={onCreateAccount}>
        <Text style={GlobalStyles.secondaryButtonText}>Create an account</Text>
      </Pressable>
    </>
  )
}
