import React from 'react'
import { Button, Text, TextInput, ToastAndroid, View } from 'react-native'

// import required custom context hooks
import { useAuth } from '../contexts/AuthProvider'
import { useUser } from '../contexts/UserProvider'

import GlobalStyles from '../styles/GlobalStyles'

export default function EditAccount ({ navigation }) {
  const { authState } = useAuth()
  const { userFunctions } = useUser()

  const [isLoading, setIsLoading] = React.useState(true)

  const [newFirstName, setNewFirstName] = React.useState('')
  const [newLastName, setNewLastName] = React.useState('')
  const [newEmail, setNewEmail] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [newConfirmPassword, setNewConfirmPassword] = React.useState('')

  const onSave = () => {
    const requestData = {
      newFirstName: newFirstName,
      newLastName: newLastName,
      newEmail: newEmail,
      userToken: authState.userToken,
      userId: authState.userId
    }
    if (newPassword !== '') requestData.newPassword = newPassword

    userFunctions.saveDetails(requestData)
      .then(res => {
        if (res.success === false) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT)
          return
        }

        ToastAndroid.show('Details Updated!', ToastAndroid.SHORT)
        if (navigation.canGoBack()) {
          navigation.pop()
        } else {
          navigation.navigate('Locations')
        }
      })
  }

  React.useEffect(() => {
    userFunctions.fetchDetails({ userToken: authState.userToken, userId: authState.userId })
      .then((res) => {
        if (res.success === false) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT)
          return
        }

        setNewFirstName(res.data.first_name)
        setNewLastName(res.data.last_name)
        setNewEmail(res.data.email)

        setIsLoading(false)
      })
  }, [])

  return (
    <View style={GlobalStyles.contentWrapper}>
      <View style={{ marginTop: 10 }}>
        <View style={GlobalStyles.flexRow}>
          <Text style={GlobalStyles.textBoxTitle}>First Name:</Text>
          <TextInput
            style={GlobalStyles.textBoxInput}
            onChangeText={val => setNewFirstName(val)}
            value={newFirstName}
          />
        </View>
        <View style={GlobalStyles.flexRow}>
          <Text style={GlobalStyles.textBoxTitle}>Last Name:</Text>
          <TextInput
            style={GlobalStyles.textBoxInput}
            onChangeText={val => setNewLastName(val)}
            value={newLastName}
          />
        </View>
        <View style={GlobalStyles.flexRow}>
          <Text style={GlobalStyles.textBoxTitle}>Email:</Text>
          <TextInput
            style={GlobalStyles.textBoxInput}
            autoCapitalize='none'
            autoCompleteType='email'
            keyboardType='email-address'
            onChangeText={val => setNewEmail(val)}
            value={newEmail}
          />
        </View>
        <View style={GlobalStyles.flexRow}>
          <Text style={GlobalStyles.textBoxTitle}>New Password:</Text>
          <TextInput
            style={GlobalStyles.textBoxInput}
            autoCapitalize='none'
            autoCompleteType='password'
            placeholder='(Leave blank to not change)'
            placeholderTextColor='#999'
            secureTextEntry
            onChangeText={val => setNewPassword(val)}
            value={newPassword}
          />
        </View>
        <View style={GlobalStyles.flexRow}>
          <Text style={GlobalStyles.textBoxTitle}>Confirm New Password:</Text>
          <TextInput
            style={GlobalStyles.textBoxInput}
            autoCapitalize='none'
            autoCompleteType='password'
            placeholder='(Leave blank to not change)'
            placeholderTextColor='#999'
            secureTextEntry
            onChangeText={val => setNewConfirmPassword(val)}
            value={newConfirmPassword}
          />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Button title='Save' disabled={(isLoading || (newPassword !== '' && newPassword !== newConfirmPassword))} onPress={onSave} />
      </View>
    </View>
  )
}
