import React, { useState } from 'react'
import { Button, TextInput } from 'react-native'

import GlobalStyles from '../GlobalStyles'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
      <Button title='Login' />
      <Button title='Create an account' />
    </>
  )
}

export default LoginForm
