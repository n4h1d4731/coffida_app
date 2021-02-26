import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

// import required providers
import UserProvider from '_providers/user'

// import required screens
import Settings from '_screens/settings'
import EditAccount from '_screens/edit-account'

// import required styles
import { Colors } from '_styles'

const Stack = createStackNavigator()

export default function SettingsNavigator () {
  const customScreenOptions = (title) => ({
    headerStyle: {
      backgroundColor: Colors.PRIMARY_DARK_COLOR
    },
    headerTintColor: Colors.PRIMARY_TEXT_COLOR,
    headerTitle: title,
    headerTitleAlign: 'center'
  })

  return (
    <UserProvider>
      <Stack.Navigator initialRouteName='Settings'>
        <Stack.Screen name='Settings' component={Settings} options={customScreenOptions('Settings')} />
        <Stack.Screen name='EditAccount' component={EditAccount} options={customScreenOptions('Edit Account')} />
      </Stack.Navigator>
    </UserProvider>
  )
}
