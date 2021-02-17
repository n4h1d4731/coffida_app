import React, { useState } from 'react'
import { Alert, Button, ToastAndroid, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import { useNavigation } from '@react-navigation/native'

import GlobalStyles from '../GlobalStyles'

const API_ENDPOINT = 'http://10.0.2.2:3333/api/1.0.0'

const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigation = useNavigation()

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

    fetch(API_ENDPOINT + '/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email, password: password })
    })
      .then(res => {
        Alert.alert('Account Created!')
        navigation.popToTop()
      })
      .catch(e => {
        console.log('Error creating user...')
        console.log(e)
      })
  }

  return (
    <View style={GlobalStyles.contentWrapper}>
      <View style={{ flex: 0.7, flexDirection: 'column' }}>
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
      <View style={{ flex: 0.3 }}>
        <Button title='Create Account' onPress={onCreateAccount} />
      </View>
    </View>
  )
}

export default Signup
