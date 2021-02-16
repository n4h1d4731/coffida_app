import 'react-native-gesture-handler'

import React, { useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Locations from './components/locations'
import Login from './components/login'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='Login'
          component={Login}

          options={
            {
              title: 'Login',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: '#fff'
              },
              headerStyle: {
                backgroundColor: '#111111'
              }
            }
          }
        />
        <Stack.Screen
          name='Locations'
          component={Locations}
          options={
            {
              title: 'Coffee Locations',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: '#fff'
              },
              headerStyle: {
                backgroundColor: '#111111'
              }
            }
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
