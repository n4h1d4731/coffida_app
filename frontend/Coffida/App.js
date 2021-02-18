import 'react-native-gesture-handler'

import React from 'react'
import { Alert } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { MenuProvider } from 'react-native-popup-menu'

import AsyncStorage from '@react-native-async-storage/async-storage'

import SplashScreen from './components/splash-screen'
import SignIn from './components/sign-in'
import SignUp from './components/sign-up'
import Locations from './components/locations'

const API_ENDPOINT = 'http://10.0.2.2:3333/api/1.0.0'

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

export const AuthContext = React.createContext()

export default function App ({ navigation }) {
  const [state, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN': {
        return {
          ...prevState,
          userToken: action.token,
          userId: action.id,
          isLoading: false
        }
      }
      case 'SIGN_IN': {
        return {
          ...prevState,
          userToken: action.token,
          userId: action.id
        }
      }
      case 'SIGN_OUT': {
        return {
          ...prevState,
          userToken: null,
          userId: null
        }
      }
    }
  }, {
    isLoading: true,
    userToken: null,
    userId: null
  })

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null
      let userId = null

      try {
        userToken = await AsyncStorage.getItem('@userToken')

        userId = await AsyncStorage.getItem('@userId')
        if (userId !== null) userId = parseInt(userId)

        dispatch({ type: 'RESTORE_TOKEN', token: userToken, id: userId })
      } catch (e) {
        Alert.alert('Failed retrieve sign in details. Please sign in again.')
      }
    }

    bootstrapAsync()
  }, [])

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        try {
          const res = await fetch(API_ENDPOINT + '/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: data.email, password: data.password })
          }).then(res => res.json())

          await AsyncStorage.setItem('@userToken', res.token)
          await AsyncStorage.setItem('@userId', res.id.toString())

          dispatch({ type: 'SIGN_IN', userToken: res.token, userId: res.id })
        } catch (e) {
          console.log('Failed to post login...')
          console.log(e)

          Alert.alert('Failed to sign. Please try again.')
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('@userToken')
          await AsyncStorage.removeItem('@userId')

          dispatch({ type: 'SIGN_OUT' })
        } catch (e) {
          console.log('Failed to remove sign in details from local storage...')
          console.log(e)

          Alert.alert('Failed to sign out. Please try again.')
        }
      },
      signUp: async data => {
        try {
          await fetch(API_ENDPOINT + '/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ first_name: data.firstName, last_name: data.lastName, email: data.email, password: data.password })
          })
        } catch (e) {
          console.log('Failed to post user...')
          console.log(e)

          Alert.alert('Failed to sign up. Please try again')
        }
      }
    }),
    []
  )

  return (
    <MenuProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>
            {
              state.isLoading
                ? (
                  <Stack.Screen name='SplashScreen' component={SplashScreen} options={customStackOptions('')} />
                  )
                : (
                    state.userToken === null
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
      </AuthContext.Provider>
    </MenuProvider>
  )
}
