import React, { useCallback } from 'react'
import { ActivityIndicator, FlatList, ToastAndroid, View } from 'react-native'
import { Text } from 'react-native-elements'

// import required providers
import { useAuth } from '_providers/auth'
import { useFilters } from '_providers/filters'

// import required components
import Location from '_components/location'

// import required hooks
import { useLocationsSearch } from '_hooks'

// import required styles
import { Colors, GlobalStyles } from '_styles'

export default function Locations ({ navigation, route }) {
  const [offset, setOffset] = React.useState(0)
  const limit = 20

  const { authState } = useAuth()
  const { filtersState } = useFilters()

  const {
    loading,
    error,
    locations,
    hasMore
  } = useLocationsSearch(authState.userToken, filtersState, limit, offset)
  if (error) {
    ToastAndroid.show(`Failed to load ${hasMore === true ? 'more' : ''} locations`, ToastAndroid.SHORT)
  }

  const renderEmptyList = useCallback(() => {
    if (loading) {
      return (
        <ActivityIndicator size='large' color={Colors.PRIMARY_TEXT_COLOR} />
      )
    }
    return (
      <Text h4 style={{ textAlign: 'center', color: Colors.PRIMARY_TEXT_COLOR }}>No Locations Found</Text>
    )
  }, [])

  const keyExtractor = useCallback((item, index) => {
    return index.toString()
  }, [])

  const renderItem = useCallback(({ item }) => {
    return <Location navigation={navigation} location={item} />
  }, [])

  const handleLastLocationReached = useCallback(() => {
    if (hasMore === false || loading === true) {
      return
    }
    setOffset(prevOffset => prevOffset + limit)
  }, [])

  return (
    <View style={GlobalStyles.screenWrapper}>
      <FlatList
        keyExtractor={keyExtractor}
        data={locations}
        maxToRenderPerBatch={6}
        renderItem={renderItem}
        onEndReached={handleLastLocationReached}
        ListEmptyComponent={renderEmptyList()}
      />
    </View>
  )
}
