import React from 'react'

// import required stack navigation components
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// import required components
import SplashScreen from './SplashScreen'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Locations from './Locations'

// import required custom context hooks
import { useAuthState, useAuthUpdate } from '../contexts/AuthProvider'

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
  const authState = useAuthState()
  const authUpdate = useAuthUpdate()

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      authUpdate.restoreToken()
      console.log('RAN!')
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
                    authState.userToken === null
                      ? (
                        <>
                          <Stack.Screen name='SignIn' component={SignIn} options={customStackOptions('Sign In')} />
                          <Stack.Screen name='SignUp' component={SignUp} options={customStackOptions('Sign Up')} />
                        </>
                        )
                      : (
                        <Stack.Screen name='Locations' component={Locations} options={customStackOptions('Locations')} />
                        )
                  )
            }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
