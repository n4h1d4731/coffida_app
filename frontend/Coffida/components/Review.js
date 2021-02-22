import React from 'react'
import { Dimensions, View, Text } from 'react-native'

import { Rating } from 'react-native-ratings'

export default function Review (props) {
  const screen = Dimensions.get('screen')

  

  const renderReview = () => {
    if (props.data == null) return (<></>)

    return (
      <>
        <View>
          <Text>Overall Rating:</Text>
          <Rating
            type='custom'
            ratingColor='yellow'
            ratingBackgroundColor='#111'
            tintColor='#333'
            imageSize={screen.width / 20}
            ratingCount={5}
            startingValue={props.data.overallRating}
            readonly
            style={{ alignSelf: 'center' }}
          />
        </View>
        <View>
          <Text>Price Rating:</Text>
          <Rating
            type='custom'
            ratingColor='yellow'
            ratingBackgroundColor='#111'
            tintColor='#333'
            imageSize={screen.width / 20}
            ratingCount={5}
            startingValue={props.data.priceRating}
            readonly
            style={{ alignSelf: 'center' }}
          />
        </View>
        <View>
          <Text>Quality Rating:</Text>
          <Rating
            type='custom'
            ratingColor='yellow'
            ratingBackgroundColor='#111'
            tintColor='#333'
            imageSize={screen.width / 20}
            ratingCount={5}
            startingValue={props.data.qualityRating}
            readonly
            style={{ alignSelf: 'center' }}
          />
        </View>
        <View>
          <Text>Cleanliness Rating:</Text>
          <Rating
            type='custom'
            ratingColor='yellow'
            ratingBackgroundColor='#111'
            tintColor='#333'
            imageSize={screen.width / 20}
            ratingCount={5}
            startingValue={props.data.cleanlinessRating}
            readonly
            style={{ alignSelf: 'center' }}
          />
        </View>
        <View>
          <Text>{props.data.reviewBody}</Text>
        </View>
        <View>
          <Text>Likes: {props.data.likes}</Text>
        </View>
      </>
    )
  }

  return renderReview()
}
