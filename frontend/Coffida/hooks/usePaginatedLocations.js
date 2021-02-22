import React from 'react'

import { useLocation } from '../contexts/LocationProvider'

export default function usePaginatedLocations (userToken, filters, limit, offset) {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [locations, setLocations] = React.useState([])
  const [hasMore, setHasMore] = React.useState(false)

  const { locationFunctions } = useLocation()

  React.useEffect(() => {
    setLocations([])
  }, [filters])

  React.useEffect(() => {
    setLoading(true)
    setError(false)

    locationFunctions.getAllLocations(userToken, filters, limit, offset)
      .then(res => {
        setLoading(false)

        if (res.success === false) {
          setError(true)
          return
        }

        if (res.data.length === 0) {
          setHasMore(false)
          return
        }

        setLocations(prevLocations => {
          let locationData = res.data.map(location => ({
            id: location.location_id,
            name: location.location_name,
            town: location.location_town,
            photoPath: location.photo_path,
            avgOverallRating: location.avg_overall_rating,
            avgPriceRating: location.avg_price_rating,
            avgQualityRating: location.avg_quality_rating,
            avgCleanlinessRating: location.avg_clenliness_rating
          }))

          locationData = locationData.filter(newLocation => prevLocations.findIndex(prevLocation => prevLocation.id === newLocation.id) === -1)
          return [...prevLocations, ...locationData]
        })
      })
  }, [filters, offset])

  return { loading, error, locations, hasMore }
}
