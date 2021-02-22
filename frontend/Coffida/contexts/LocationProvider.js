import React from 'react'
import { ToastAndroid } from 'react-native'

import { useAuth } from './AuthProvider'

const API_ENDPOINT = 'http://10.0.2.2:3333/api/1.0.0'

const LocationContext = React.createContext()

export function useLocation () {
  return React.useContext(LocationContext)
}

export default function LocationProvider ({ children }) {
  const { authFunctions } = useAuth()

  const locationFunctions = React.useMemo(() => ({
    getAllLocations: async (userToken, filters, limit, offset) => {
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
    },
    getLocation: (locationId) => {
      return fetch(API_ENDPOINT + `/location/${locationId}`)
        .then(async res => {
          if (res.status === 404) return { success: false, message: 'Location not found' }
          if (res.status === 500) return { success: false, message: 'Server Error' }

          const data = await res.json()
          return { success: true, data: data }
        }).catch(e => {
          console.log('Failed to recieve single location...')
          console.log(e)

          return { success: 'false', message: 'Failed to get the location' }
        })
    },
    getAllFavourites: (userToken) => {
      return fetch(API_ENDPOINT + '/find?search_in=favourite', {
        method: 'POST',
        headers: {
          'X-Authorization': userToken
        }
      })
        .then(async res => {
          if (res.status === 400) return { success: false, message: 'Failed to get location data' }
          if (res.status === 500) return { success: false, message: 'Server Error' }

          if (res.status === 401) {
            authFunctions.signOut()
              .then(res => { if (res.success === false) ToastAndroid.show(res.message, ToastAndroid.SHORT) })

            return { success: false, message: 'Server Error' }
          }

          if (res.status === 404) return { success: true, data: [] }

          const jsonData = await res.json()
          return { success: true, data: jsonData }
        })
    }
  }), [])

  const value = {
    locationFunctions
  }

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}
