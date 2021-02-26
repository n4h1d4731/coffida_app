import React, { useEffect, useState } from 'react'
import { FlatList, ToastAndroid, View } from 'react-native'

// import required providers
import { useLocation } from '_providers/location'

// import required components
import Review from '_components/review'

// import requiered styles
import { GlobalStyles } from '_styles'

export default function Reviews ({ navigation, route }) {
  const [reviews, setReviews] = useState([])

  const { locationService } = useLocation()

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

  function keyExtractor (item, index) {
    return index.toString()
  }

  function renderItem ({ item }) {
    return <Review locationId={route.params?.locationId} review={item} />
  }

  useEffect(() => {
    if (route.params?.locationId == null) {
      console.error('Navigated to route without supplying locationId')
      navigation.navigate('Locations')
    }
    updateReviews()
  }, [route.params?.locationId])

  return (
    <View style={GlobalStyles.screenWrapper}>
      <FlatList
        keyExtractor={keyExtractor}
        data={reviews}
        maxToRenderPerBatch={3}
        renderItem={renderItem}
      />
    </View>
  )
}
