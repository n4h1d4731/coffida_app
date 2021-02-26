import React, { createContext, useContext, useReducer, useMemo } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

const API_ENDPOINT = 'http://10.0.2.2:3333/api/1.0.0'

const AuthContext = createContext()

export function useAuth () {
  return useContext(AuthContext)
}

export default function AuthProvider ({ children }) {
  const [authState, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN': {
        return {
          ...prevState,
          userToken: action.userToken,
          userId: action.userId,
          isRestoringToken: false
        }
      }
      case 'SIGN_IN': {
        return {
          ...prevState,
          userToken: action.userToken,
          userId: action.userId
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

  const authService = useMemo(() => ({
    restoreToken: async () => {
      let userToken = null
      let userId = null

      try {
        userToken = await AsyncStorage.getItem('@userToken')
        userId = await AsyncStorage.getItem('@userId')

        if (userId !== null) userId = parseInt(userId)

        dispatch({ type: 'RESTORE_TOKEN', userToken: userToken, userId: userId })
        return { success: true, data: { userToken } }
      } catch (e) {
        console.log('Failed to restore token')
        console.log(e)

        return { success: false, message: 'Failed retrieve sign in details' }
      }
    },
    signIn: async data => {
      try {
        return fetch(API_ENDPOINT + '/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: data.email, password: data.password })
        }).then(async res => {
          if (res.status === 400) return { success: false, message: 'Invalid email/password' }
          else if (res.status === 500) return { success: false, message: 'Server Error' }
          else {
            const jsonData = await res.json()
            return { success: true, data: jsonData }
          }
        }).then(async res => {
          if (res.success === false) return res

          await AsyncStorage.setItem('@userToken', res.data.token)
          await AsyncStorage.setItem('@userId', res.data.id.toString())

          dispatch({ type: 'SIGN_IN', userToken: res.data.token, userId: res.data.id })
          return { success: true }
        })
      } catch (e) {
        console.log('Failed to post login...')
        console.log(e)

        return { success: false, message: 'Failed to sign' }
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('@userToken')
        await AsyncStorage.removeItem('@userId')

        dispatch({ type: 'SIGN_OUT' })
        return { success: true }
      } catch (e) {
        console.log('Failed to remove sign in details from local storage...')
        console.log(e)

        return { success: false, message: 'Failed to sign out' }
      }
    },
    signUp: async data => {
      return fetch(API_ENDPOINT + '/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ first_name: data.firstName, last_name: data.lastName, email: data.email, password: data.password })
      }).then(res => {
        if (res.status === 400) return { success: false, message: 'Invalid email/password' }
        else if (res.status === 500) return { success: false, message: 'Server Error' }
        else return { success: true }
      }).catch(e => {
        console.log('Failed to signup...')
        console.log(e)

        return { success: false, message: 'Failed to sign up' }
      })
    }
  }), [])

  return (
    <AuthContext.Provider value={{ authState, authService }}>
      {children}
    </AuthContext.Provider>
  )
}
