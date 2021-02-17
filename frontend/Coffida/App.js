import 'react-native-gesture-handler'

import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Locations from './components/locations'
import Login from './components/login'
import Signup from './components/signup'

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
              },
              headerTintColor: '#fff'
            }
          }
        />
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={
            {
              title: 'Sign Up',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: '#fff'
              },
              headerStyle: {
                backgroundColor: '#111111'
              },
              headerTintColor: '#fff'
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
              },
              headerTintColor: '#fff'
            }
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
