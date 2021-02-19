import React from 'react'
import { Alert } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

const API_ENDPOINT = 'http://10.0.2.2:3333/api/1.0.0'

const AuthStateContext = React.createContext()
const AuthUpdateContext = React.createContext()

export function useAuthState () {
  return React.useContext(AuthStateContext)
}

export function useAuthUpdate () {
  return React.useContext(AuthUpdateContext)
}

export default function AuthProvider ({ children }) {
  const [authState, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN': {
        return {
          ...prevState,
          userToken: action.token,
          userId: action.id,
          isRestoringToken: false
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
    userToken: null,
    userId: null,
    isRestoringToken: true
  })

  const authUpdate = React.useMemo(
    () => ({
      restoreToken: async () => {
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
      },
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
    <AuthStateContext.Provider value={authState}>
      <AuthUpdateContext.Provider value={authUpdate}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthStateContext.Provider>
  )
}
