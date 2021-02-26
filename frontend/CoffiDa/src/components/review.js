import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ToastAndroid, View } from 'react-native'
import { Button, Card, Text } from 'react-native-elements'

// import required providers
import { useReview } from '_providers/review'

// import required style
import { Colors, GlobalStyles } from '_styles'

export default function Review (props) {
  if (props.review == null || props.locationId == null) return (<></>)

  const [isDeleting, setIsDeleting] = useState(false)
  const [hasImage, setHasImage] = useState(false)
  const [imageData, setImageData] = useState({})

  const { reviewService } = useReview()

  function handleUpdateReview () {
    props.navigation.navigate('UpdateReview', { locationId: props.locationId, review: props.review })
  }

  function handleDeleteReview () {
    setIsDeleting(true)
    reviewService.deleteReview(props.locationId, props.review.id)
      .then(res => {
        setIsDeleting(false)
        if (res.success === false) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT)
          return
        }
        ToastAndroid.show('Deleted the Review', ToastAndroid.SHORT)
        props.navigation.navigate('Reviews', { refresh: true, locationId: props.locationId })
      })
  }

  function renderImageIfAvailable () {
    reviewService.getReviewPhoto(props.locationId, props.review.id)
      .then(res => {
        if (res.success === false) return
        setImageData(res.data)
        setHasImage(true)
      })
  }

  function renderButtons () {
    if (props.isUserReview === true) {
      return (
        <>
          <Card.Divider />
          <Button
            title='Update Review'
            type='solid'
            buttonStyle={{ backgroundColor: Colors.PRIMARY_LIGHT_COLOR }}
            titleStyle={{ color: Colors.PRIMARY_TEXT_COLOR }}
            onPress={handleUpdateReview}
          />
          <Button
            title='Delete Review'
            type='clear'
            titleStyle={{ color: Colors.PRIMARY_TEXT_COLOR }}
            onPress={handleDeleteReview}
            disabled={isDeleting}
          />
        </>
      )
    }
  }

  useEffect(() => {
    renderImageIfAvailable()
  }, [])

  return (
    <Card containerStyle={GlobalStyles.cardWrapper}>
      {hasImage ? <Card.Image source={{ uri: imageData }} PlaceholderContent={<ActivityIndicator />} /> : <></>}
      <Card.Divider />
      <View style={GlobalStyles.cardDetail}>
        <Text style={GlobalStyles.cardDetailText}>Overall Rating:</Text>
        <Text style={GlobalStyles.cardDetailText}>{props.review.overallRating} / 5</Text>
      </View>
      <View style={GlobalStyles.cardDetail}>
        <Text style={GlobalStyles.cardDetailText}>Price Rating:</Text>
        <Text style={GlobalStyles.cardDetailText}>{props.review.priceRating} / 5</Text>
      </View>
      <View style={GlobalStyles.cardDetail}>
        <Text style={GlobalStyles.cardDetailText}>Quality Rating:</Text>
        <Text style={GlobalStyles.cardDetailText}>{props.review.qualityRating} / 5</Text>
      </View>
      <View style={GlobalStyles.cardDetail}>
        <Text style={GlobalStyles.cardDetailText}>Cleanliness Rating:</Text>
        <Text style={GlobalStyles.cardDetailText}>{props.review.cleanlinessRating} / 5</Text>
      </View>
      <Card.Divider />
      <View style={GlobalStyles.reviewBodyContainer}>
        <Text style={GlobalStyles.cardDetailText}>{props.review.body}</Text>
      </View>
      <View>
        {renderButtons()}
      </View>
    </Card>
  )
}
