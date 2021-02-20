import React from 'react'
import { ToastAndroid } from 'react-native'

// import required stack navigation components
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// import required components
import SplashScreen from './SplashScreen'

import SignIn from './SignIn'
import SignUp from './SignUp'

import Locations from './Locations'
import EditAccount from './EditAccount'
import ChangePassword from './ChangePassword'

// import required custom context hooks
import { useAuth } from '../contexts/AuthProvider'

const Stack = createStackNavigator()
const customStackOptions = (title) => ({
  title: title,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: '#fff'
  },
  headerStyle: {
    backgroundColor: '#111111'
  },
  headerTintColor: '#fff'
})

export default function Main () {
  const { authState, authFunctions } = useAuth()

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      authFunctions.restoreToken()
        .then(res => { if (res.success === false) ToastAndroid.show(res.message, ToastAndroid.SHORT) })
    }

    bootstrapAsync()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
              authState.isRestoringToken
                ? (
                  <Stack.Screen name='SplashScreen' component={SplashScreen} options={customStackOptions('')} />
                  )
                : (
                    (authState.userToken === null || authState.userId === null)
                      ? (
                        <>
                          <Stack.Screen name='SignIn' component={SignIn} options={customStackOptions('Sign In')} />
                          <Stack.Screen name='SignUp' component={SignUp} options={customStackOptions('Sign Up')} />
                        </>
                        )
                      : (
                        <>
                          <Stack.Screen name='Locations' component={Locations} options={customStackOptions('Locations')} />
                          <Stack.Screen name='EditAccount' component={EditAccount} options={customStackOptions('Edit Account')} />
                          <Stack.Screen name='ChangePassword' component={ChangePassword} options={customStackOptions('Change Password')} />
                        </>
                        )
                  )
            }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
