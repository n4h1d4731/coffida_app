import React, { useCallback, useState } from 'react'
import { ActivityIndicator, ToastAndroid, View } from 'react-native'
import { Button, Card, Text } from 'react-native-elements'

// import required providers
import { useUser } from '_providers/user'

// import required style
import { Colors, GlobalStyles } from '_styles'

export default function Location (props) {
  const [imageSource, setImageSource] = useState({ uri: props.location.photoPath })
  const location = props.location

  const { userService } = useUser()

  const handleViewReviews = () => {
    props.navigation.navigate('Reviews', { locationId: location.id })
  }

  const handleToggleFavourite = () => {
    userService.setFavouriteLocation({ locationId: location.id, favourite: !props.isFavourite })
      .then(res => {
        if (res.success === false) {
          ToastAndroid.show(`Failed to ${props.isFavourite === true ? '' : 'un'}favourite location`, ToastAndroid.SHORT)
          return
        }

        userService.fetchDetails() // repopulate all user data to refresh the change in location favourites
      })
  }

  const handleImageLoadError = useCallback(() => {
    setImageSource(require('_assets/images/coffee-cup.png'))
  }, [])

  return (
    <Card containerStyle={GlobalStyles.cardWrapper}>
      <Card.Title style={GlobalStyles.cardTitle}>{location.name}</Card.Title>
      <Card.Divider />
      <Card.Image
        source={imageSource}
        onError={handleImageLoadError}
        PlaceholderContent={<ActivityIndicator size='large' color={Colors.PRIMARY_DARK_COLOR} />}
        resizeMode='contain'
      />
      <Card.Divider />
      <View style={GlobalStyles.cardDetail}>
        <Text style={GlobalStyles.cardDetailText}>Town:</Text>
        <Text style={GlobalStyles.cardDetailText}>{location.town}</Text>
      </View>
      <View style={GlobalStyles.cardDetail}>
        <Text style={GlobalStyles.cardDetailText}>Avg Overall Rating:</Text>
        <Text style={GlobalStyles.cardDetailText}>{location.avgOverallRating} / 5</Text>
      </View>
      <View style={GlobalStyles.cardDetail}>
        <Text style={GlobalStyles.cardDetailText}>Avg Price Rating:</Text>
        <Text style={GlobalStyles.cardDetailText}>{location.avgPriceRating} / 5</Text>
      </View>
      <View style={GlobalStyles.cardDetail}>
        <Text style={GlobalStyles.cardDetailText}>Avg Quality Rating:</Text>
        <Text style={GlobalStyles.cardDetailText}>{location.avgQualityRating} / 5</Text>
      </View>
      <View style={GlobalStyles.cardDetail}>
        <Text style={GlobalStyles.cardDetailText}>Avg Cleanliness Rating:</Text>
        <Text style={GlobalStyles.cardDetailText}>{location.avgCleanlinessRating} / 5</Text>
      </View>
      <Button
        title='View Reviews'
        type='solid'
        buttonStyle={{ backgroundColor: Colors.PRIMARY_LIGHT_COLOR }}
        titleStyle={{ color: Colors.PRIMARY_TEXT_COLOR }}
        onPress={handleViewReviews}
      />
      <Button
        title={props.isFavourite !== true ? 'Favourite' : 'Unfavourite'}
        type='clear'
        titleStyle={{ color: Colors.PRIMARY_TEXT_COLOR }}
        onPress={handleToggleFavourite}
      />
    </Card>
  )
}
