import React from 'react'
import { ActivityIndicator, Button, FlatList, Pressable, Text, View } from 'react-native'

// import required contexts
import { useAuth } from '../contexts/AuthProvider'

// import required components
import Location from './Location'

// import required hooks
import usePaginatedLocations from '../hooks/usePaginatedLocations'

// styles
import GlobalStyles from '../styles/GlobalStyles'

export default function Locations ({ navigation, route }) {
  const [filters, setFilters] = React.useState({})
  const [offset, setOffset] = React.useState(0)
  const limit = 10

  const { authState } = useAuth()

  const {
    loading,
    error,
    locations,
    hasMore
  } = usePaginatedLocations(authState.userToken, filters, limit, offset)
  
  const onLastLocationReached = () => {
    if (hasMore === false || loading) return

    setOffset(prevOffset => prevOffset + limit)
  }

  const onFiltersPress = () => {
    navigation.navigate('Filters', { filters })
  }

  React.useEffect(() => {
    if (route.params?.filters) {
      setFilters({ ...route.params?.filters })
      setOffset(0)
    }
  }, [route.params?.filters])

  return (
    <View style={[GlobalStyles.contentWrapper, { flex: 1, justifyContent: 'space-between' }]}>
      <FlatList
        onEndReached={onLastLocationReached}
        keyExtractor={(item) => item.id.toString()}
        data={locations}
        renderItem={({ item }) => (
          <Pressable onPress={() => { navigation.navigate('LocationDetails', { locationId: item.id }) }}>
            <Location location={item} />
          </Pressable>
        )}
      />
      {error ? <Text>Failed to load {hasMore ? 'more' : ''} locations</Text> : <></>}
      {loading ? <ActivityIndicator size='large' color='#fff' /> : <></>}
      <Button color='#111' title='Filter' onPress={onFiltersPress} />
    </View>
  )
}
