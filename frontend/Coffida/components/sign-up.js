import React from 'react'
import { Button, ToastAndroid, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import { AuthContext } from '../App'

import GlobalStyles from '../GlobalStyles'

export default function Signup ({ navigation }) {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const { signUp } = React.useContext(AuthContext)

  const onCreateAccount = () => {
    if (firstName === '') {
      ToastAndroid.show('First Name must not be empty!', ToastAndroid.SHORT)
      return
    }
    if (lastName === '') {
      ToastAndroid.show('Last Name must not be empty!', ToastAndroid.SHORT)
      return
    }
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
    if (password !== confirmPassword) {
      ToastAndroid.show('Passwords do not match!', ToastAndroid.SHORT)
      return
    }

    signUp({ firstName: firstName, lastName: lastName, email: email, password: password })
      .then(() => {
        ToastAndroid.show('Account Created!', ToastAndroid.LONG)
        if (navigation.canGoBack()) {
          navigation.pop()
        } else {
          navigation.navigate('SignIn')
        }
      })
  }

  return (
    <View style={GlobalStyles.contentWrapper}>
      <View style={{ flex: 0.9, flexDirection: 'column' }}>
        <TextInput
          style={GlobalStyles.textInput}
          placeholder='First Name'
          placeholderTextColor='#fff'
          onChangeText={firstName => setFirstName(firstName)}
        />
        <TextInput
          style={GlobalStyles.textInput}
          placeholder='Last Name'
          placeholderTextColor='#fff'
          onChangeText={lastName => setLastName(lastName)}
        />
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
        <TextInput
          style={GlobalStyles.textInput}
          autoCapitalize='none'
          autoCompleteType='password'
          placeholder='Confirm Password'
          secureTextEntry
          contextMenuHidden
          placeholderTextColor='#fff'
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
        />
      </View>
      <View style={{ flex: 0.1, justifyContent: 'flex-end' }}>
        <Button title='Create Account' onPress={onCreateAccount} />
      </View>
    </View>
  )
}
