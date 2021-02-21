import React from 'react'
import { ToastAndroid } from 'react-native'

// import required stack navigation components
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

// import required components
import Home from './Home'
import EditAccount from './EditAccount'

// import required custom context hooks
import { useAuth } from '../contexts/AuthProvider'
import SignOut from './SignOut'

const Drawer = createDrawerNavigator()

export default function Main () {
  const { authState, authFunctions } = useAuth()

  const customDrawerOptions = {
    headerShown: true,
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#111'
    }
  }

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      authFunctions.restoreToken()
        .then(res => { if (res.success === false) ToastAndroid.show(res.message, ToastAndroid.SHORT) })
    }

    bootstrapAsync()
  }, [])

  const renderDrawerScreens = () => {
    if (authState.isRestoringToken === false && (authState.userToken == null || authState.userId == null)) {
      return (
        <Drawer.Screen name='Home' component={Home} options={{ headerShown: false }} />
      )
    }

    return (
      <>
        <Drawer.Screen name='Home' component={Home} options={{ title: 'Home' }} />
        <Drawer.Screen name='EditAccount' component={EditAccount} options={{ title: 'Edit Account' }} />
        <Drawer.Screen name='SignOut' component={SignOut} options={{ title: 'Sign Out' }} />
      </>
    )
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={customDrawerOptions}>
        {renderDrawerScreens()}
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
