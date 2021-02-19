import 'react-native-gesture-handler'

import React from 'react'

// import required custom components
import Main from './components/Main'

// import required contexts
import { MenuProvider } from 'react-native-popup-menu' // provider from node-module
import AuthProvider from './contexts/AuthProvider'
import UserProvider from './contexts/UserProvider'

export default function App () {
  return (
    <MenuProvider>
      <AuthProvider>
        <UserProvider>
          <Main />
        </UserProvider>
      </AuthProvider>
    </MenuProvider>
  )
}
