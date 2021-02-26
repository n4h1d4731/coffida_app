import React, { useLayoutEffect, useState } from 'react'
import { FlatList, ToastAndroid, View } from 'react-native'
import { Button } from 'react-native-elements'

// import required providers
import { useLocation } from '_providers/location'
import { useUser } from '_providers/user'

// import required components
import Review from '_components/review'

// import requiered styles
import { Colors, GlobalStyles } from '_styles'

export default function Reviews ({ navigation, route }) {
  const [reviews, setReviews] = useState([])

  const { locationService } = useLocation()
  const { userState } = useUser()

  function updateReviews () {
    locationService.getLocation(route.params?.locationId)
      .then(res => {
        if (res.success === false) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT)
          navigation.navigate('Locations')
          return
        }

        setReviews([...res.data.location_reviews.map(review => ({
          id: review.review_id,
          overallRating: review.overall_rating,
          priceRating: review.price_rating,
          qualityRating: review.quality_rating,
          cleanlinessRating: review.clenliness_rating,
          body: review.review_body,
          likes: review.likes
        }))])
      })
  }

  function handleAddReview () {
    navigation.navigate('AddReview', { locationId: route.params?.locationId })
  }

  function keyExtractor (item, index) {
    return item.id.toString()
  }

  function renderItem ({ item }) {
    const isUserReview = userState.reviews.includes(item.id)
    return <Review navigation={navigation} isUserReview={isUserReview} locationId={route.params?.locationId} review={item} />
  }

  useLayoutEffect(() => {
    if (route.params?.locationId == null) {
      console.error('Navigated to route without supplying locationId')
      navigation.navigate('Locations')
    }
    updateReviews()
    if (route.params?.refresh === true) route.params.refresh = false
  }, [route.params?.locationId, route.params?.refresh])

  return (
    <View style={GlobalStyles.screenWrapper}>
      <Button
        title='Add Review'
        type='solid'
        buttonStyle={{ backgroundColor: Colors.PRIMARY_LIGHT_COLOR }}
        titleStyle={{ color: Colors.PRIMARY_TEXT_COLOR }}
        onPress={handleAddReview}
      />
      <FlatList
        keyExtractor={keyExtractor}
        data={reviews}
        maxToRenderPerBatch={6}
        renderItem={renderItem}
      />
    </View>
  )
}
