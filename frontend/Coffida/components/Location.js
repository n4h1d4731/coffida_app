import React from 'react'
import { Dimensions, Image, Text, View } from 'react-native'

import { Rating } from 'react-native-ratings'

import locationStyles from '../styles/LocationStyles'

export default function Location (props) {
  const screen = Dimensions.get('screen')

  return (
    <View style={locationStyles.wrapper}>
      <Text style={locationStyles.header}>{props.location.name}</Text>
      <Image defaultSource={require('../res/img/coffee-cup.png')} source={{ uri: props.location.photoPath }} style={locationStyles.image} />
      <View>
        <View style={locationStyles.detail}>
          <Text style={locationStyles.text}>Town:</Text>
          <Text style={[locationStyles.text, { justifyContent: 'flex-end' }]}>{props.location.town}</Text>
        </View>
        <View style={locationStyles.detail}>
          <Text style={locationStyles.text}>Average Overall Rating: </Text>
          <Rating
            type='custom'
            ratingColor='yellow'
            ratingBackgroundColor='#111'
            tintColor='#333'
            imageSize={screen.width / 20}
            ratingCount={5}
            startingValue={props.location.avgOverallRating || 0}
            readonly
            style={{ justifyContent: 'flex-end' }}
          />
        </View>
      </View>
    </View>
  )
}
