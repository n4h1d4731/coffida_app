import React, { useEffect } from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { useAuth } from '_providers/auth'

import AuthStack from './auth-navigator'
import AppStack from './app-navigator'

const Stack = createStackNavigator()

export default function RootNavigation () {
  const { authState, authService } = useAuth()

  useEffect(() => {
    setTimeout(() => {
      authService.restoreToken()
    }, 2000)
  }, [])

  const renderConditionalStacks = () => {
    if (authState.userToken == null || authState.userId == null) {
      return (
        <Stack.Screen name='AuthStack' component={AuthStack} />
      )
    } else {
      return (
        <Stack.Screen name='AppStack' component={AppStack} />
      )
    }
  }

  return (
    <Stack.Navigator initialRouteName='AuthStack' headerMode='none'>
      {renderConditionalStacks()}
    </Stack.Navigator>
  )
}
