import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// import required providers
import FiltersProvider from '_providers/filters'

// import required components
import Icon from 'react-native-vector-icons/FontAwesome'

// import required navigators
import SettingsStack from '_navigations/settings-navigator'
import LocationStack from '_navigations/location-navigator'

// import required screens
import FiltersScreen from '_screens/filters'

// import required styles
import { Colors } from '_styles'

// import required utils
import { totalSize, width } from 'react-native-dimension'

const Tab = createBottomTabNavigator()

export default function AppNavigation () {
  const customTabBarOptions = {
    activeBackgroundColor: Colors.PRIMARY_COLOR,
    inactiveBackgroundColor: Colors.PRIMARY_COLOR,
    activeTintColor: Colors.SECONDARY_TEXT_COLOR,
    inactiveTintColor: Colors.PRIMARY_TEXT_COLOR,
    labelStyle: {
      fontSize: totalSize(1.5)
    }
  }

  const customScreenOptions = (title, iconName) => ({
    title,
    tabBarIcon: ({ focused }) => {
      return (
        <Icon
          name={iconName}
          size={width(5)}
          color={focused ? Colors.SECONDARY_TEXT_COLOR : Colors.PRIMARY_TEXT_COLOR}
        />
      )
    }
  })

  return (
    <FiltersProvider>
      <Tab.Navigator initialRouteName='LocationStack' tabBarOptions={customTabBarOptions}>
        <Tab.Screen name='Filters' component={FiltersScreen} options={customScreenOptions('Location Filters', 'filter')} />
        <Tab.Screen name='LocationStack' component={LocationStack} options={customScreenOptions('Locations', 'coffee')} />
        <Tab.Screen name='SettingsStack' component={SettingsStack} options={customScreenOptions('Settings', 'cogs')} />
      </Tab.Navigator>
    </FiltersProvider>
  )
}
