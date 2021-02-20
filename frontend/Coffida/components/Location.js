import React from 'react'
import { Dimensions, Image, Pressable, Text, View } from 'react-native'

import { Rating } from 'react-native-ratings'

import locationStyles from '../styles/LocationStyles'

export default function Location (props) {
  const [locationImage, setLocationImage] = React.useState({ uri: props.location.photoPath })

  const screen = Dimensions.get('screen')

  const onComponentPress = () => {
    // TODO: display full details of the location including reviews
  }

  const onImgLoadError = () => {
    setLocationImage(require('../res/img/not-found.jpg'))
  }

  return (
    <View style={locationStyles.wrapper}>
      <Pressable onPress={onComponentPress}>
        <Text style={locationStyles.header}>{props.location.name}</Text>
        <Image
          source={locationImage}
          onError={onImgLoadError}
          style={{ width: screen.width, height: screen.height / 4, resizeMode: 'stretch' }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={locationStyles.text}>Town: {props.location.town}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={locationStyles.text}>Rating: </Text>
            <Rating
              type='custom'
              ratingColor='yellow'
              ratingBackgroundColor='#111'
              tintColor='#333'
              imageSize={screen.width / 20}
              ratingCount={5}
              startingValue={props.location.overallRating}
              readonly
              style={{ alignSelf: 'center' }}
            />
          </View>
        </View>
      </Pressable>
    </View>
  )
}
