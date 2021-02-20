import React from 'react'
import { ToastAndroid } from 'react-native'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'

import { useAuthUpdate } from '../contexts/AuthProvider'

import GlobalStyles from '../styles/GlobalStyles'

export default function HeaderRightOptions ({ navigation }) {
  const authUpdate = useAuthUpdate()

  const onSelect = () => {
    navigation.navigate('EditAccount')
  }

  const onLogout = () => {
    authUpdate.signOut()
      .then(res => { if (res.success === false) ToastAndroid.show(res.message, ToastAndroid.SHORT) })
  }

  return (
    <Menu>
      <MenuTrigger text='Options' customStyles={{ triggerText: { color: '#fff' } }} style={GlobalStyles.headerButton} />
      <MenuOptions>
        <MenuOption text='Edit Account' onSelect={onSelect} />
        <MenuOption text='Logout' onSelect={onLogout} />
      </MenuOptions>
    </Menu>
  )
}
