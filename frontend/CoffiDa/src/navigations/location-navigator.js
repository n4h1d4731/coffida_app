import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// import required providers
import LocationProvider from '_providers/location'
import ReviewProvider from '_providers/review'

// import required screens
import Locations from '_screens/locations'
import Reviews from '_screens/reviews'
import AddReview from '_screens/add-review'
import UpdateReview from '_screens/update-review'

// import required styles
import { Colors } from '_styles'

const Stack = createStackNavigator()

export default function LocationNavigator () {
  const customScreenOptions = (title) => ({
    headerStyle: {
      backgroundColor: Colors.PRIMARY_DARK_COLOR
    },
    headerTintColor: Colors.PRIMARY_TEXT_COLOR,
    headerTitle: title,
    headerTitleAlign: 'center'
  })

  return (
    <LocationProvider>
      <ReviewProvider>
        <Stack.Navigator initialRouteName='Locations'>
          <Stack.Screen name='Locations' component={Locations} options={customScreenOptions('Locations')} />
          <Stack.Screen name='Reviews' component={Reviews} options={customScreenOptions('Reviews')} />
          <Stack.Screen name='AddReview' component={AddReview} options={customScreenOptions('Add Review')} />
          <Stack.Screen name='UpdateReview' component={UpdateReview} options={customScreenOptions('Update Review')} />
        </Stack.Navigator>
      </ReviewProvider>
    </LocationProvider>
  )
}
