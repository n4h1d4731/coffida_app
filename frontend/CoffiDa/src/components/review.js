import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Card, Text } from 'react-native-elements'

// import required providers
import { useReview } from '_providers/review'

// import required style
import { GlobalStyles } from '_styles'

export default function Review (props) {
  if (props.review == null || props.locationId == null) return (<></>)

  const [hasImage, setHasImage] = useState(false)
  const [imageData, setImageData] = useState({})

  const { reviewService } = useReview()

  function renderImageIfAvailable () {
    reviewService.getReviewPhoto(props.locationId, props.review.id)
      .then(res => {
        if (res.success === false) return
        setImageData(res.data)
        setHasImage(true)
      })
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
    </Card>
  )
}
