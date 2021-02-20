import React from 'react'
import { Button, TextInput, ToastAndroid, View } from 'react-native'

import { useAuthState } from '../contexts/AuthProvider'
import { useUserUpdate } from '../contexts/UserProvider'

import GlobalStyles from '../styles/GlobalStyles'

export default function ChangePassword ({ navigation }) {
  const [newPassword, setNewPassword] = React.useState('')
  const [newConfirmPassword, setNewConfirmPassword] = React.useState('')

  const authState = useAuthState()
  const userUpdate = useUserUpdate()

  const changePassword = () => {
    userUpdate.updatePassword({ password: newPassword, userToken: authState.userToken, userId: authState.userId })
      .then(res => {
        if (res.success === false) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT)
          return
        }

        ToastAndroid.show('Password changed successfully!', ToastAndroid.SHORT)
        if (navigation.canGoBack()) {
          navigation.popToTop()
        } else {
          navigation.navigate('Locations')
        }
      })
  }

  return (
    <View style={GlobalStyles.contentWrapper}>
      <View style={{ flex: 0.7 }}>
        <TextInput
          style={GlobalStyles.textInput}
          autoCapitalize='none'
          autoCompleteType='password'
          placeholder='New Password'
          placeholderTextColor='#fff'
          secureTextEntry
          onChangeText={password => setNewPassword(password)}
          value={newPassword}
        />
        <TextInput
          style={GlobalStyles.textInput}
          autoCapitalize='none'
          autoCompleteType='password'
          placeholder='Confirm New Password'
          secureTextEntry
          contextMenuHidden
          placeholderTextColor='#fff'
          onChangeText={confirmPassword => setNewConfirmPassword(confirmPassword)}
          value={newConfirmPassword}
        />
      </View>
      <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
        <Button title='Change Password' disabled={((newPassword !== newConfirmPassword) || newPassword === '')} onPress={changePassword} />
      </View>
    </View>
  )
}
