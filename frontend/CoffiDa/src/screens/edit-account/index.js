import React, { useEffect, useState } from 'react'
import { ToastAndroid, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

// import required providers
import { useUser } from '_providers/user'

// import required components
import Icon from 'react-native-vector-icons/FontAwesome'

// import required styles
import { Colors, GlobalStyles } from '_styles'

// import required utils
import { validateEmail } from '_utils/validators'
import { width } from 'react-native-dimension'

export default function EditAccount ({ navigation }) {
  const [isLoading, setIsLoading] = useState(false)

  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newConfirmPassword, setNewConfirmPassword] = useState('')

  const { userState, userService } = useUser()

  const handleUpdateAccount = () => {
    if (newFirstName === '') {
      ToastAndroid.show('First Name must not be empty!', ToastAndroid.SHORT)
      return
    }
    if (newLastName === '') {
      ToastAndroid.show('Last Name must not be empty!', ToastAndroid.SHORT)
      return
    }
    if (newEmail === '') {
      ToastAndroid.show('Email must not be empty!', ToastAndroid.SHORT)
      return
    }

    if (validateEmail(newEmail) !== true) {
      ToastAndroid.show('Invalid Email given!', ToastAndroid.SHORT)
      return
    }
    if (newPassword !== newConfirmPassword) {
      ToastAndroid.show('Passwords do not match!', ToastAndroid.SHORT)
      return
    }

    setIsLoading(true)
    userService.saveDetails({ newFirstName, newLastName, newEmail, newPassword })
      .then(res => {
        setIsLoading(false)
        if (res.success === false) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT)
          return
        }

        ToastAndroid.show('Updated Successfully', ToastAndroid.SHORT)
        navigation.navigate('Settings')
      })
  }

  const handleRefreshDetails = () => {
    setNewPassword('')
    setNewConfirmPassword('')

    fetchCurrentDetails()
  }

  const fetchCurrentDetails = () => {
    setNewFirstName(userState.firstName)
    setNewLastName(userState.lastName)
    setNewEmail(userState.email)
  }

  useEffect(() => {
    fetchCurrentDetails()
  }, [])

  return (
    <View style={GlobalStyles.screenWrapper}>
      <View>
        <Input
          label='First Name'
          leftIcon={
            <Icon
              name='user'
              size={width(5)}
              color={Colors.PRIMARY_TEXT_COLOR}
            />
          }
          disabled={isLoading}
          style={GlobalStyles.input}
          onChangeText={newFirstName => setNewFirstName(newFirstName)}
          value={newFirstName}
        />
        <Input
          label='Last Name'
          leftIcon={
            <Icon
              name='user'
              size={width(5)}
              color={Colors.PRIMARY_TEXT_COLOR}
            />
          }
          disabled={isLoading}
          style={GlobalStyles.input}
          onChangeText={newLastName => setNewLastName(newLastName)}
          value={newLastName}
        />
        <Input
          label='Email'
          leftIcon={
            <Icon
              name='envelope'
              size={width(4)}
              color={Colors.PRIMARY_TEXT_COLOR}
            />
          }
          disabled={isLoading}
          style={GlobalStyles.input}
          onChangeText={newEmail => setNewEmail(newEmail)}
          value={newEmail}
        />
        <Input
          label='Password'
          placeholder='(Leave blank to not change)'
          secureTextEntry
          leftIcon={
            <Icon
              name='lock'
              size={width(5)}
              color={Colors.PRIMARY_TEXT_COLOR}
            />
          }
          disabled={isLoading}
          style={GlobalStyles.input}
          onChangeText={newPassword => setNewPassword(newPassword)}
          value={newPassword}
        />
        <Input
          label='Confirm Password'
          placeholder='(Leave blank to not change)'
          secureTextEntry
          leftIcon={
            <Icon
              name='lock'
              size={width(5)}
              color={Colors.PRIMARY_TEXT_COLOR}
            />
          }
          disabled={isLoading}
          style={GlobalStyles.input}
          onChangeText={newConfirmPassword => setNewConfirmPassword(newConfirmPassword)}
          value={newConfirmPassword}
        />
      </View>
      <View>
        <Button
          title='Update Account'
          type='solid'
          buttonStyle={{ backgroundColor: Colors.PRIMARY_LIGHT_COLOR }}
          titleStyle={{ color: Colors.PRIMARY_TEXT_COLOR }}
          loading={isLoading}
          onPress={handleUpdateAccount}
        />
        <Button
          title='Refresh'
          type='clear'
          titleStyle={{ color: Colors.PRIMARY_TEXT_COLOR }}
          onPress={handleRefreshDetails}
        />
      </View>
    </View>
  )
}
