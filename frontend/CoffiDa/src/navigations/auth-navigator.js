import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// import required providers
import { useAuth } from '_providers/auth'

// import required screens
import AuthLoading from '_screens/auth-loading'
import SignIn from '_screens/sign-in'
import SignUp from '_screens/sign-up'

// import required styles
import { Colors } from '_styles'

const Stack = createStackNavigator()

export default function AuthNavigator () {
  const { authState } = useAuth()

  if (authState.isRestoringToken === true) {
    return (
      <AuthLoading />
    )
  }

  const customScreenOptions = (title) => ({
    headerStyle: {
      backgroundColor: Colors.PRIMARY_DARK_COLOR
    },
    headerTintColor: Colors.PRIMARY_TEXT_COLOR,
    headerTitle: title,
    headerTitleAlign: 'center'
  })

  return (
    <Stack.Navigator initialRouteName='SignIn'>
      <Stack.Screen name='SignIn' component={SignIn} options={customScreenOptions('Sign In')} />
      <Stack.Screen name='SignUp' component={SignUp} options={customScreenOptions('Sign Up')} />
    </Stack.Navigator>
  )
}
