import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

// import required components
import SplashScreen from './SplashScreen'

import SignIn from './SignIn'
import SignUp from './SignUp'

import Locations from './Locations'
import Filters from './Filters'

// import required custom context hooks
import { useAuth } from '../contexts/AuthProvider'

const Stack = createStackNavigator()

export default function Home () {
  const { authState } = useAuth()

  const renderStackScreens = () => {
    const customStackOptions = { headerShown: false }

    if (authState.isRestoringToken === true) {
      return (
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={customStackOptions} />
      )
    }

    if (authState.userToken == null || authState.userId == null) {
      return (
        <>
          <Stack.Screen name='SignIn' component={SignIn} options={customStackOptions} />
          <Stack.Screen name='SignUp' component={SignUp} options={customStackOptions} />
        </>
      )
    }

    return (
      <>
        <Stack.Screen name='Locations' component={Locations} options={customStackOptions} />
        <Stack.Screen name='Filters' component={Filters} options={customStackOptions} />
      </>
    )
  }

  return (
    <Stack.Navigator>
      {renderStackScreens()}
    </Stack.Navigator>
  )
}
