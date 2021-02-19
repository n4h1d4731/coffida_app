import React from 'react'
import { Button, Pressable, Text, TextInput, ToastAndroid, View } from 'react-native'

// import required custom context hooks
import { useAuthState } from '../contexts/AuthProvider'
import { useUserUpdate } from '../contexts/UserProvider'

import GlobalStyles from '../GlobalStyles'

export default function EditAccount ({ navigation }) {
  const authState = useAuthState()

  const userUpdate = useUserUpdate()

  const [isLoading, setIsLoading] = React.useState(true)

  const [newFirstName, setNewFirstName] = React.useState('')
  const [newLastName, setNewLastName] = React.useState('')
  const [newEmail, setNewEmail] = React.useState('')

  const onSave = () => {
    userUpdate.saveDetails({
      newFirstName: newFirstName,
      newLastName: newLastName,
      newEmail: newEmail,
      userToken: authState.userToken,
      userId: authState.userId
    })
      .then(() => {
        ToastAndroid.show('Details Updated!', ToastAndroid.SHORT)
        if (navigation.canGoBack()) {
          navigation.pop()
        } else {
          navigation.navigate('Locations')
        }
      })
  }

  const onChangePassword = () => {
    navigation.navigate('ChangePassword')
  }

  React.useEffect(() => {
    userUpdate.fetchDetails({ userToken: authState.userToken, userId: authState.userId })
      .then((res) => {
        setNewFirstName(res.firstName)
        setNewLastName(res.lastName)
        setNewEmail(res.email)

        setIsLoading(false)
      })
  }, [])

  return (
    <View style={GlobalStyles.contentWrapper}>
      <View style={{ flex: 0.7 }}>
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
      </View>
      <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
        <Button title='Save' disabled={isLoading} onPress={onSave} />
        <Pressable style={GlobalStyles.secondaryButton} onPress={onChangePassword}>
          <Text style={GlobalStyles.secondaryButtonText}>Change Password</Text>
        </Pressable>
      </View>
    </View>
  )
}
