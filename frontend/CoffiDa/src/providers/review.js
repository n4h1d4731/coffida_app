import React from 'react'

import { readAsDataURL } from 'promise-file-reader'

import { useAuth } from '_providers/auth'

const API_ENDPOINT = 'http://10.0.2.2:3333/api/1.0.0'

const ReviewContext = React.createContext()

export function useReview () {
  return React.useContext(ReviewContext)
}

export default function Review ({ children }) {
  const { authState } = useAuth()

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
    },
    updateReview: (locationId, reviewId, review) => {
      return fetch(API_ENDPOINT + `/location/${locationId}/review/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'X-Authorization': authState.userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
      })
        .then(res => {
          return (res.status !== 200) ? { success: false, message: 'Failed to update the review' } : { success: true }
        })
    },
    deleteReview: (locationId, reviewId) => {
      return fetch(API_ENDPOINT + `/location/${locationId}/review/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'X-Authorization': authState.userToken
        }
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 404) return { success: false, message: 'Failed to delete the review' }
          return { success: true }
        })
    }
  }), [])

  return (
    <ReviewContext.Provider value={{ reviewService }}>
      {children}
    </ReviewContext.Provider>
  )
}
