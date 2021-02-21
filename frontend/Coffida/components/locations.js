import React from 'react'
import { View, ActivityIndicator, FlatList, ToastAndroid, Button } from 'react-native'

// import required contexts
import { useAuth } from '../contexts/AuthProvider'

// import required components
import Location from './Location'

import GlobalStyles from '../styles/GlobalStyles'

const API_ENDPOINT = 'http://10.0.2.2:3333/api/1.0.0'

export default function Locations ({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false)

  const [locationsData, setLocationsData] = React.useState([])

  const [locationFilters] = React.useState({})
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
    if (isLoading === true || true) return // do not actually run this function as the server returns duplicate records

    setIsLoading(true)
    getLocations(authState.userToken, locationFilters, locationFilterLimit, locationFilterOffset + 1)
      .then(res => {
        if (res.data.count === 0) {
          setIsLoading(false)
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
        setIsLoading(false)
      })
  }

  React.useEffect(() => {
    setIsLoading(true)
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
        setIsLoading(false)
      })
  }, [])

  return (
    <View style={GlobalStyles.contentWrapper}>
      <>
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
      </>
      <View>
        {isLoading ? (<ActivityIndicator size='small' color='#fff' />) : (<></>)}
        <Button style={GlobalStyles.bottomRightButton} title='Filter' />
      </View>
    </View>
  )
}
