import React, { useState } from 'react'
import { ToastAndroid, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import InputScrollView from 'react-native-input-scroll-view'

// import required providers
import { useLocation } from '_providers/location'
import { useUser } from '_providers/user'

// import required styles
import { Colors, GlobalStyles } from '_styles'

// import required utils
import { validateNumber } from '_utils/validators'

export default function AddReviewScreen ({ navigation, route }) {
  const props = route.params

  const [isLoading, setIsLoading] = useState(false)

  const [overallRating, setOverallRating] = useState('0')
  const [priceRating, setPriceRating] = useState('0')
  const [qualityRating, setQualityRating] = useState('0')
  const [cleanlinessRating, setCleanlinessRating] = useState('0')

  const [message, setMessage] = useState('')

  const { locationService } = useLocation()
  const { userService } = useUser()

  function handleAddReview () {
    if (message === '') {
      ToastAndroid.show('You must have a message', ToastAndroid.SHORT)
      return
    }

    if (validateNumber(overallRating, 0, 5) === false) {
      ToastAndroid.show('Invalid Overall Rating', ToastAndroid.SHORT)
      return
    }
    if (validateNumber(priceRating, 0, 5) === false) {
      ToastAndroid.show('Invalid Price Rating', ToastAndroid.SHORT)
      return
    }
    if (validateNumber(qualityRating, 0, 5) === false) {
      ToastAndroid.show('Invalid Quality Rating', ToastAndroid.SHORT)
      return
    }
    if (validateNumber(cleanlinessRating, 0, 5) === false) {
      ToastAndroid.show('Invalid Cleanliness Rating', ToastAndroid.SHORT)
      return
    }

    setIsLoading(true)
    locationService.addReview(props.locationId, {
      review_body: message,
      overall_rating: Number.parseInt(overallRating),
      price_rating: Number.parseInt(priceRating),
      quality_rating: Number.parseInt(qualityRating),
      clenliness_rating: Number.parseInt(cleanlinessRating)
    })
      .then(res => {
        setIsLoading(false)
        if (res.success === false) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT)
          return
        }
        userService.fetchDetails()
        navigation.navigate('Reviews', { refresh: true })
      })
  }

  return (
    <View style={GlobalStyles.screenWrapper}>
      <InputScrollView>
        <Input
          label='Overall Rating (Max 5)'
          keyboardType='decimal-pad'
          style={GlobalStyles.input}
          onChangeText={(newOverallRating => setOverallRating(newOverallRating))}
          value={overallRating}
        />
        <Input
          label='Price Rating (Max 5)'
          keyboardType='decimal-pad'
          style={GlobalStyles.input}
          onChangeText={(newPriceRating => setPriceRating(newPriceRating))}
          value={priceRating}
        />
        <Input
          label='Overall Rating (Max 5)'
          keyboardType='decimal-pad'
          style={GlobalStyles.input}
          onChangeText={(newQualityRating => setQualityRating(newQualityRating))}
          value={qualityRating}
        />
        <Input
          label='Cleanliness Rating (Max 5)'
          keyboardType='decimal-pad'
          style={GlobalStyles.input}
          onChangeText={(newCleanlinessRating => setCleanlinessRating(newCleanlinessRating))}
          value={cleanlinessRating}
        />
        <Input
          label='Message'
          multiline
          style={GlobalStyles.input}
          onChangeText={(newMessage => setMessage(newMessage))}
          value={message}
        />
        <Button
          title='Add Review'
          type='solid'
          disabled={isLoading}
          buttonStyle={{ backgroundColor: Colors.PRIMARY_LIGHT_COLOR }}
          titleStyle={{ color: Colors.PRIMARY_TEXT_COLOR }}
          onPress={handleAddReview}
        />
      </InputScrollView>
    </View>
  )
}
