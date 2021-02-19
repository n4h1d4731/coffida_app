import React from 'react'
import { ToastAndroid } from 'react-native'

const API_ENDPOINT = 'http://10.0.2.2:3333/api/1.0.0'

const UserStateContext = React.createContext()
const UserUpdateContext = React.createContext()

export function useUserState () {
  return React.useContext(UserStateContext)
}

export function useUserUpdate () {
  return React.useContext(UserUpdateContext)
}

export default function UserProvider ({ children }) {
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

  const userUpdate = React.useMemo(() => ({
    fetchDetails: async data => {
      try {
        const res = await fetch(API_ENDPOINT + `/user/${data.userId}`, {
          method: 'GET',
          headers: {
            'X-Authorization': data.userToken
          }
        }).then(res => {
          if (res.status !== 200) throw new Error('Server didn\'t respond 200 OK')

          return res.json()
        })
        dispatch({ type: 'UPDATE_DETAILS', firstName: res.first_name, lastName: res.last_name, email: res.email })

        return { firstName: res.first_name, lastName: res.last_name, email: res.email }
      } catch (e) {
        console.log('Failed to load user details...')
        console.log(e)

        ToastAndroid.show('Failed to load your details. Please try again.', ToastAndroid.SHORT)
      }
    },
    saveDetails: async data => {
      try {
        await fetch(API_ENDPOINT + `/user/${data.userId}`, {
          method: 'PATCH',
          headers: {
            'X-Authorization': data.userToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ first_name: data.newFirstName, last_name: data.newLastName, email: data.newEmail })
        }).then(res => {
          if (res.ok === false) throw new Error('Server didn\'t respond 200 OK')
        })
        dispatch({ type: 'UPDATE_DETAILS', firstName: data.newFirstName, lastName: data.newLastName, email: data.newEmail })
      } catch (e) {
        console.log('Failed to update user details...')
        console.log(e)

        ToastAndroid.show('Failed to update your details. Please try again.', ToastAndroid.SHORT)
      }
    },
    updatePassword: async data => {
      try {
        await fetch(API_ENDPOINT + `/user/${data.userId}`, {
          method: 'PATCH',
          headers: {
            'X-Authorization': data.userToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password: data.password })
        }).then(res => {
          if (res.ok === false) throw new Error('Server didn\'t respond 200 OK')
        })
      } catch (e) {
        console.log('Failed to update password...')
        console.log(e)

        ToastAndroid.show('Failed to update your password. Please try again.', ToastAndroid.SHORT)
      }
    }
  }),
  []
  )

  return (
    <UserStateContext.Provider value={userState}>
      <UserUpdateContext.Provider value={userUpdate}>
        {children}
      </UserUpdateContext.Provider>
    </UserStateContext.Provider>
  )
}
