import React from 'react'
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, Text, View } from 'react-native'

import { useAuth } from '../contexts/AuthProvider'
import { useLocation } from '../contexts/LocationProvider'

import Location from './Location'
import Review from './Review'
import { Rating } from 'react-native-ratings'

import GlobalStyles from '../styles/GlobalStyles'
import LocationStyles from '../styles/LocationStyles'

export default function LocationDetails ({ navigation, route }) {
  const [locationDetails, setLocationDetails] = React.useState({})

  const [reviews, setReviews] = React.useState([])
  const [loadingReviews, setLoadingReviews] = React.useState(true)

  const [favourite, setFavourite] = React.useState(false)

  const screen = Dimensions.get('screen')

  const locationId = route.params?.locationId

  const { authState } = useAuth()
  const { locationFunctions } = useLocation()

  const loadData = async () => {
    if (locationId == null) {
      if (navigation.canGoBack()) navigation.pop()
      else navigation.navigation('Locations')
      return
    }

    let res = await locationFunctions.getLocation(locationId)
    if (res.success === false) {
      Alert.alert('Failed to load the location data. Please try again.')
      return navigation.canGoBack() ? navigation.pop() : navigation.navigate('Locations')
    }

    setLocationDetails({
      id: res.data.location_id,
      name: res.data.location_name,
      town: res.data.location_town,
      latitude: res.data.latitude,
      longitude: res.data.longitude,
      photoPath: res.data.photo_path,
      avgOverallRating: res.data.avg_overall_rating,
      avgPriceRating: res.data.avg_price_rating,
      avgQualityRating: res.data.avg_quality_rating,
      avgCleanlinessRating: res.data.avg_clenliness_rating
    })

    let reviewData = res.data.location_reviews
    reviewData = reviewData.map(review => ({
      id: review.review_id,
      overallRating: review.overall_rating,
      priceRating: review.price_rating,
      qualityRating: review.quality_rating,
      cleanlinessRating: review.clenliness_rating,
      reviewBody: review.review_body,
      likes: review.likes
    }))
    setReviews(reviewData)
    setLoadingReviews(false)

    res = await locationFunctions.getAllFavourites(authState.userToken)
    if (res.success === false) {
      Alert.alert('Failed to load the location data. Please try again.')
      return
    }
    const locations = res.data
    if (locations.findIndex(location => location.location_id === locationId) !== -1) setFavourite(true)
  }

  const onFavouritePress = () => {
    // TODO: toggle favourite
  }

  React.useLayoutEffect(() => {
    loadData()
  }, [reviews])

  return (
    <View style={[GlobalStyles.contentWrapper, { marginBottom: 10, justifyContent: 'flex-start' }]}>
      <Location location={locationDetails} />
      <View style={LocationStyles.wrapper}>
        <Text style={LocationStyles.header2}>Additional Ratings:</Text>
        <View style={LocationStyles.detail}>
          <Text style={LocationStyles.text}>Average Price Rating: </Text>
          <Rating
            type='custom'
            ratingColor='yellow'
            ratingBackgroundColor='#111'
            tintColor='#333'
            imageSize={screen.width / 20}
            ratingCount={5}
            startingValue={locationDetails.avgPriceRating || 0}
            readonly
            style={{ alignSelf: 'center' }}
          />
        </View>
        <View style={LocationStyles.detail}>
          <Text style={LocationStyles.text}>Average Quality Rating: </Text>
          <Rating
            type='custom'
            ratingColor='yellow'
            ratingBackgroundColor='#111'
            tintColor='#333'
            imageSize={screen.width / 20}
            ratingCount={5}
            startingValue={locationDetails.avgQualityRating || 0}
            readonly
            style={{ alignSelf: 'center' }}
          />
        </View>
        <View style={LocationStyles.detail}>
          <Text style={LocationStyles.text}>Average Cleanliness Rating: </Text>
          <Rating
            type='custom'
            ratingColor='yellow'
            ratingBackgroundColor='#111'
            tintColor='#333'
            imageSize={screen.width / 20}
            ratingCount={5}
            startingValue={locationDetails.avgCleanlinessRating || 0}
            readonly
            style={{ alignSelf: 'center' }}
          />
        </View>
        <Button color='#111' title={favourite ? 'Unfavourite' : 'Favourite'} onPress={onFavouritePress} />
      </View>
      <View>
        {
          loadingReviews
            ? (<ActivityIndicator size='large' color='#fff' />)
            : (
              <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={reviews}
                renderItem={({ item }) => (
                  <View style={{ marginVertical: 5, padding: 5 }}>
                    <Review data={item} />
                  </View>
                )}
              />
              )
        }
      </View>
    </View>
  )
}
