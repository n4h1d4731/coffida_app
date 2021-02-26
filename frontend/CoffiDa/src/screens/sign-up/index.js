import React, { useState } from 'react'
import { ToastAndroid, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

// import required providers
import { useAuth } from '_providers/auth'

// import required components
import Icon from 'react-native-vector-icons/FontAwesome'

// import required styles
import { Colors, GlobalStyles } from '_styles'

// import required utils
import { validateEmail } from '_utils/validators'
import { width } from 'react-native-dimension'

export default function SignUpScreen ({ navigation }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { authService } = useAuth()

  const handleSignUp = () => {
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

    if (validateEmail(email) !== true) {
      ToastAndroid.show('Invalid Email given!', ToastAndroid.SHORT)
      return
    }
    if (password !== confirmPassword) {
      ToastAndroid.show('Passwords do not match!', ToastAndroid.SHORT)
      return
    }

    authService.signUp({ firstName: firstName, lastName: lastName, email: email, password: password })
      .then(res => {
        if (res.success === false) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT)
          return
        }

        ToastAndroid.show('Account Created!', ToastAndroid.SHORT)
        navigation.navigate('SignIn')
      })
  }

  return (
    <View style={GlobalStyles.screenWrapper}>
      <View>
        <Input
          placeholder='First Name'
          leftIcon={
            <Icon
              name='user'
              size={width(5)}
              color={Colors.PRIMARY_TEXT_COLOR}
            />
          }
          style={GlobalStyles.input}
          onChangeText={newFirstName => setFirstName(newFirstName)}
          value={firstName}
        />
        <Input
          placeholder='Last Name'
          leftIcon={
            <Icon
              name='user'
              size={width(5)}
              color={Colors.PRIMARY_TEXT_COLOR}
            />
          }
          style={GlobalStyles.input}
          onChangeText={newLastName => setLastName(newLastName)}
          value={lastName}
        />
        <Input
          placeholder='Email'
          leftIcon={
            <Icon
              name='envelope'
              size={width(4)}
              color={Colors.PRIMARY_TEXT_COLOR}
            />
          }
          style={GlobalStyles.input}
          onChangeText={newEmail => setEmail(newEmail)}
          value={email}
        />
        <Input
          placeholder='Password'
          secureTextEntry
          leftIcon={
            <Icon
              name='lock'
              size={width(5)}
              color={Colors.PRIMARY_TEXT_COLOR}
            />
          }
          style={GlobalStyles.input}
          onChangeText={newPassword => setPassword(newPassword)}
          value={password}
        />
        <Input
          placeholder='Confirm Password'
          secureTextEntry
          leftIcon={
            <Icon
              name='lock'
              size={width(5)}
              color={Colors.PRIMARY_TEXT_COLOR}
            />
          }
          style={GlobalStyles.input}
          onChangeText={newConfirmPassword => setConfirmPassword(newConfirmPassword)}
          value={confirmPassword}
        />
      </View>
      <View>
        <Button
          title='Sign Up'
          type='solid'
          buttonStyle={{ backgroundColor: Colors.PRIMARY_LIGHT_COLOR }}
          titleStyle={{ color: Colors.PRIMARY_TEXT_COLOR }}
          onPress={handleSignUp}
        />
      </View>
    </View>
  )
}
