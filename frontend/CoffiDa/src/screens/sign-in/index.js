import React, { useState } from 'react'
import { ToastAndroid, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

// import required providers
import { useAuth } from '_providers/auth'

// import required components
import Banner from '_components/banner'
import Icon from 'react-native-vector-icons/FontAwesome'

// import required utils
import { validateEmail } from '_utils/validators'
import { width } from 'react-native-dimension'

// import required styles
import { Colors, GlobalStyles } from '_styles'

export default function LoginScreen ({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { authService } = useAuth()

  const handleSignIn = () => {
    if (email == null) {
      ToastAndroid.show('Email must not be empty!', ToastAndroid.SHORT)
      return
    }
    if (password == null) {
      ToastAndroid.show('Password must not be empty!', ToastAndroid.SHORT)
      return
    }

    if (validateEmail(email) === false) {
      ToastAndroid.show('Invalid Email given!', ToastAndroid.SHORT)
      return
    }

    authService.signIn({ email, password })
      .then(res => {
        if (res.success === false) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT)
        }
      })
  }

  return (
    <View style={GlobalStyles.screenWrapper}>
      <View style={{ }}>
        <Banner />
      </View>
      <View style={{ justifyContent: 'flex-end' }}>
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
          leftIcon={
            <Icon
              name='lock'
              size={width(5)}
              color={Colors.PRIMARY_TEXT_COLOR}
            />
          }
          secureTextEntry
          style={GlobalStyles.input}
          onChangeText={newPassword => setPassword(newPassword)}
          value={password}
        />
        <Button
          title='Sign In'
          type='solid'
          buttonStyle={{ backgroundColor: Colors.PRIMARY_LIGHT_COLOR }}
          titleStyle={{ color: Colors.PRIMARY_TEXT_COLOR }}
          onPress={handleSignIn}
        />
        <Button
          title='Sign Up'
          type='clear'
          titleStyle={{ color: Colors.PRIMARY_TEXT_COLOR }}
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </View>
  )
}
