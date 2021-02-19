import React from 'react'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'

import { useAuthUpdate } from '../contexts/AuthProvider'

import GlobalStyles from '../GlobalStyles'

export default function HeaderRightOptions () {
  const authUpdate = useAuthUpdate()

  const onLogout = () => {
    authUpdate.signOut()
  }

  return (
    <Menu>
      <MenuTrigger text='Options' customStyles={{ triggerText: { color: '#fff' } }} style={GlobalStyles.headerButton} />
      <MenuOptions>
        <MenuOption text='Edit Account' />
        <MenuOption text='Logout' onSelect={onLogout} />
      </MenuOptions>
    </Menu>
  )
}
