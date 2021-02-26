import React, { useEffect, useState } from 'react'
import { ToastAndroid, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import InputScrollView from 'react-native-input-scroll-view'

// import required providers
import { useReview } from '_providers/review'

// import required styles
import { Colors, GlobalStyles } from '_styles'

export default function UpdateReviewScreen ({ navigation, route }) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [newReview, setNewReview] = useState({})

  const { reviewService } = useReview()

  function handleUpdateReview () {
    setIsUpdating(true)
    reviewService.updateReview(route.params?.locationId, newReview.id, {
      overall_rating: Number.parseInt(newReview.overallRating),
      price_rating: Number.parseInt(newReview.priceRating),
      quality_rating: Number.parseInt(newReview.qualityRating),
      clenliness_rating: Number.parseInt(newReview.cleanlinessRating),
      review_body: newReview.body
    })
      .then(res => {
        setIsUpdating(false)
        if (res.success === false) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT)
          return
        }
        navigation.navigate('Reviews', { refresh: true, locationId: route.params?.locationId })
      })
  }

  useEffect(() => {
    if (route.params?.review) {
      const review = { ...route.params?.review }
      review.overallRating = review.overallRating.toString()
      review.priceRating = review.priceRating.toString()
      review.qualityRating = review.qualityRating.toString()
      review.cleanlinessRating = review.cleanlinessRating.toString()
      setNewReview(review)
    }
  }, [route.params?.locationId, route.params?.review])

  return (
    <View style={GlobalStyles.screenWrapper}>
      <InputScrollView>
        <Input
          label='Overall Rating (Max 5)'
          keyboardType='decimal-pad'
          style={GlobalStyles.input}
          onChangeText={(overallRating => setNewReview(prevNewReview => ({ ...prevNewReview, overallRating })))}
          value={newReview.overallRating}
        />
        <Input
          label='Price Rating (Max 5)'
          keyboardType='decimal-pad'
          style={GlobalStyles.input}
          onChangeText={(priceRating => setNewReview(prevNewReview => ({ ...prevNewReview, priceRating })))}
          value={newReview.priceRating}
        />
        <Input
          label='Quality Rating (Max 5)'
          keyboardType='decimal-pad'
          style={GlobalStyles.input}
          onChangeText={(qualityRating => setNewReview(prevNewReview => ({ ...prevNewReview, qualityRating })))}
          value={newReview.qualityRating}
        />
        <Input
          label='Cleanliness Rating (Max 5)'
          keyboardType='decimal-pad'
          style={GlobalStyles.input}
          onChangeText={(cleanlinessRating => setNewReview(prevNewReview => ({ ...prevNewReview, cleanlinessRating })))}
          value={newReview.cleanlinessRating}
        />
        <Input
          label='Message'
          multiline
          style={GlobalStyles.input}
          onChangeText={(body => setNewReview(prevNewReview => ({ ...prevNewReview, body })))}
          value={newReview.body}
        />
        <Button
          title='Update Review'
          type='solid'
          disabled={isUpdating}
          buttonStyle={{ backgroundColor: Colors.PRIMARY_LIGHT_COLOR }}
          titleStyle={{ color: Colors.PRIMARY_TEXT_COLOR }}
          onPress={handleUpdateReview}
        />
      </InputScrollView>
    </View>
  )
}
