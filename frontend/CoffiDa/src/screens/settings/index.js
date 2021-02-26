import React from 'react'
import { ToastAndroid, View } from 'react-native'
import { ListItem } from 'react-native-elements'

// import required providers
import { useAuth } from '_providers/auth'

// import required components
import Icon from 'react-native-vector-icons/FontAwesome'

// import required styles
import { Colors, GlobalStyles } from '_styles'

// import required utils
import { width } from 'react-native-dimension'

export default function SettingsScreen ({ navigation }) {
  const { authService } = useAuth()

  const handleEditAccount = () => {
    navigation.navigate('EditAccount')
  }

  const handleSignOut = () => {
    authService.signOut()
      .then(res => {
        if (res.success === false) ToastAndroid.show(res.message, ToastAndroid.SHORT)
      })
  }

  const list = [
    {
      title: 'Edit Account',
      icon: 'edit',
      handleOnPress: handleEditAccount
    },
    {
      title: 'Sign Out',
      icon: 'sign-out',
      handleOnPress: handleSignOut
    }
  ]

  return (
    <View style={[GlobalStyles.screenWrapper, { justifyContent: 'flex-start' }]}>
      {
        list.map((item, i) => (
          <ListItem
            key={i}
            containerStyle={{
              backgroundColor: Colors.PRIMARY_LIGHT_COLOR
            }}
            onPress={item.handleOnPress} bottomDivider
          >
            <Icon
              name={item.icon}
              size={width(5)}
              color={Colors.PRIMARY_TEXT_COLOR}
            />
            <ListItem.Content>
              <ListItem.Title style={{ color: Colors.PRIMARY_TEXT_COLOR }}>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
    </View>
  )
}
