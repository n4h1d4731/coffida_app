import React from 'react'
import { View, ActivityIndicator, FlatList, ToastAndroid, Button } from 'react-native'

// import required contexts
import { useAuth } from '../contexts/AuthProvider'

// import required components
import Location from './Location'

import GlobalStyles from '../styles/GlobalStyles'

const API_ENDPOINT = 'http://10.0.2.2:3333/api/1.0.0'

export default function Locations ({ navigation, route }) {
  const isPaginationDisabled = true

  const [isLoadingFullData, setIsLoadingFullData] = React.useState(false)
  const [isLoadingNewData, setIsLoadingNewData] = React.useState(false)

  const [locationsData, setLocationsData] = React.useState([])

  const [locationFilters, setLocationFilters] = React.useState({})
  const [locationFilterOffset, setLocationFilterOffset] = React.useState(0)
  const locationFilterLimit = 20

  const { authState, authFunctions } = useAuth()

  const getLocations = async (userToken, filters, limit, offset) => {
    const allFilters = ({ ...filters, ...{ limit: limit, offset: offset } })
    const url = API_ENDPOINT + '/find?' + (Object.keys(allFilters).map(key => key + '=' + allFilters[key]).join('&'))

    return fetch(url, {
      method: 'GET',
      headers: {
        'X-Authorization': userToken
      }
    }).then(async res => {
      if (res.status === 401) {
        authFunctions.signOut()
          .then(res => { if (res.success === false) ToastAndroid.show(res.message, ToastAndroid.SHORT) })

        return { success: false, message: 'Login no longer valid' }
      } else if (res.status === 500) return { success: false, message: 'Server Error' }
      else {
        const jsonData = await res.json()
        return { success: true, data: jsonData }
      }
    }).catch(e => {
      console.log('Failed to get locations...')
      console.log(e)

      return { success: false, message: 'Failed to get the locations' }
    })
  }

  const onLastLocationReached = () => {
    if (isLoadingFullData === true || isLoadingNewData === true || isPaginationDisabled) return // do not actually run this function as the server returns duplicate records

    setIsLoadingNewData(true)
    getLocations(authState.userToken, locationFilters, locationFilterLimit, locationFilterOffset + 1)
      .then(res => {
        if (res.data.count === 0) {
          setIsLoadingNewData(false)
          return
        }
        const newLocationsData = res.data.map(location => ({
          id: location.location_id,
          name: location.location_name,
          town: location.location_town,
          photoPath: location.photo_path,
          overallRating: location.avg_overall_rating
        }))

        setLocationFilterOffset(prev => prev + 1)
        setLocationsData(prevLocationsData => [...prevLocationsData, ...newLocationsData])
        setIsLoadingNewData(false)
      })
  }

  const onFiltersPress = () => {
    navigation.navigate('Filters', { locationFilters: locationFilters })
  }

  React.useEffect(() => {
    setIsLoadingFullData(true)
    getLocations(authState.userToken, locationFilters, locationFilterLimit, locationFilterOffset)
      .then(res => {
        if (res.success === false) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT)
          return
        }

        setLocationsData(res.data.map(location => ({
          id: location.location_id,
          name: location.location_name,
          town: location.location_town,
          photoPath: location.photo_path,
          overallRating: location.avg_overall_rating
        })))
        setIsLoadingFullData(false)
      })
  }, [locationFilters])

  React.useLayoutEffect(() => {
    if (route.params?.locationFilters) {
      setLocationFilters({ ...route.params?.locationFilters })
    }
  }, [route.params?.locationFilters])

  return (
    <View style={[GlobalStyles.contentWrapper, { justifyContent: 'space-between' }]}>
      {
        isLoadingFullData === false
          ? (
            <FlatList
              onEndReached={onLastLocationReached}
              keyExtractor={(item) => item.id.toString()}
              data={locationsData}
              renderItem={({ item }) => (
                <Location
                  location={{
                    id: item.id,
                    name: item.name,
                    town: item.town,
                    photoPath: item.photoPath,
                    overallRating: item.overallRating
                  }}
                />
              )}
            />
          ) : (
            <ActivityIndicator size='large' color='#fff' style={{ marginTop: 10 }} />
          )
      }
      <View>
        {isLoadingNewData ? (<ActivityIndicator size='small' color='#fff' style={{ marginBottom: 10 }} />) : (<></>)}
        <Button color='#111' title='Filter' onPress={onFiltersPress} />
      </View>
    </View>
  )
}
