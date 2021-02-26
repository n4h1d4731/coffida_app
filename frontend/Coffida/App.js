import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { NavigationContainer } from '@react-navigation/native'

import AuthProvider from '_providers/auth'

import RootStack from '_navigations/root-navigator'

export default function App () {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
