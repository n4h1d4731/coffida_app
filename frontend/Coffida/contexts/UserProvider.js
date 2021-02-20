import React from 'react'
import { ToastAndroid } from 'react-native'

import { useAuth } from './AuthProvider'

const API_ENDPOINT = 'http://10.0.2.2:3333/api/1.0.0'

const UserContext = React.createContext()

export function useUser () {
  return React.useContext(UserContext)
}

export default function UserProvider ({ children }) {
  const authFunctions = useAuth()

  const [userState, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      case 'UPDATE_DETAILS': {
        return {
          ...prevState,
          firstName: action.firstName,
          lastName: action.lastName,
          email: action.email
        }
      }
    }
  }, {
    firstName: '',
    lastName: '',
    email: ''
  })

  const userFunctions = React.useMemo(() => ({
    fetchDetails: async data => {
      return fetch(API_ENDPOINT + `/user/${data.userId}`, {
        method: 'GET',
        headers: {
          'X-Authorization': data.userToken
        }
      }).then(async res => {
        if (res.status === 401) {
          authFunctions.signOut()
            .then(res => { if (res.success === false) ToastAndroid.show(res.message, ToastAndroid.SHORT) })

          return { success: false, message: 'Login no longer valid' }
        } else if (res.status === 500) return { success: false, message: 'Server Error' }
        else {
          const jsonData = await res.json()
          return { success: true, data: jsonData }
        }
      }).then(res => {
        if (res.status === false) return res

        dispatch({ type: 'UPDATE_DETAILS', firstName: res.data.first_name, lastName: res.data.last_name, email: res.data.email })
        return res
      }).catch(e => {
        console.log('Failed to load user details...')
        console.log(e)

        return { success: false, message: 'Failed to load your details' }
      })
    },
    saveDetails: async data => {
      return fetch(API_ENDPOINT + `/user/${data.userId}`, {
        method: 'PATCH',
        headers: {
          'X-Authorization': data.userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ first_name: data.newFirstName, last_name: data.newLastName, email: data.newEmail })
      }).then(res => {
        if (res.status === 401) {
          authFunctions.signOut()
            .then(res => { if (res.success === false) ToastAndroid.show(res.message, ToastAndroid.SHORT) })

          return { success: false, message: 'Login no longer valid' }
        } else if (res.status === 500) return { success: false, message: 'Server Error' }
        else return { success: true }
      }).then(res => {
        if (res.success === false) return res

        dispatch({ type: 'UPDATE_DETAILS', firstName: data.newFirstName, lastName: data.newLastName, email: data.newEmail })
        return res
      }).catch(e => {
        console.log('Failed to update user details...')
        console.log(e)

        return { success: false, message: 'Failed to update your details' }
      })
    },
    updatePassword: async data => {
      return fetch(API_ENDPOINT + `/user/${data.userId}`, {
        method: 'PATCH',
        headers: {
          'X-Authorization': data.userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: data.password })
      }).then(res => {
        if (res.status === 401) {
          authFunctions.signOut()
            .then(res => { if (res.success === false) ToastAndroid.show(res.message, ToastAndroid.SHORT) })

          return { success: false, message: 'Login no longer valid' }
        } else if (res.status === 500) return { success: false, message: 'Server Error' }
        else return { success: true }
      }).catch(e => {
        console.log('Failed to update password...')
        console.log(e)

        return { success: false, message: 'Failed to update your password' }
      })
    }
  }),
  []
  )

  const value = {
    userState,
    userFunctions
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
