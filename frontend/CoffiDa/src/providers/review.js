import React from 'react'

import { readAsDataURL } from 'promise-file-reader'

const API_ENDPOINT = 'http://10.0.2.2:3333/api/1.0.0'

const ReviewContext = React.createContext()

export function useReview () {
  return React.useContext(ReviewContext)
}

export default function Location ({ children }) {
  const reviewService = React.useMemo(() => ({
    getReviewPhoto: async (locationId, reviewId) => {
      return fetch(API_ENDPOINT + `/location/${locationId}/review/${reviewId}/photo`)
        .then(async res => {
          if (res.status === 404) return { success: false, message: 'Image Not Found' }
          if (res.status === 500) return { success: false, message: 'Server Error' }
          else {
            const dataBlob = await res.blob()
            const image = await readAsDataURL(dataBlob)
            return { success: true, data: image }
          }
        }).catch(e => {
          console.log('Failed to get locations...')
          console.log(e)

          return { success: false, message: 'Failed to get the locations' }
        })
    }
  }), [])

  return (
    <ReviewContext.Provider value={{ reviewService }}>
      {children}
    </ReviewContext.Provider>
  )
}
