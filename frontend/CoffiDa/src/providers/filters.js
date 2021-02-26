import React, { createContext, useContext, useMemo, useReducer } from 'react'

const FilterContext = createContext()

export function useFilters () {
  return useContext(FilterContext)
}

export default function FiltersProvider ({ children }) {
  const [filtersState, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'UPDATE_FILTERS': {
        return { ...prevState, ...action.filters }
      }
      case 'RESET_FILTERS': {
        return {}
      }
    }
  }, {})

  const filtersService = useMemo(() => ({
    updateFilters: (filters) => {
      for (const filter in filters) {
        if (filters[filter] === '') delete filters[filter]
      }
      dispatch({ type: 'UPDATE_FILTERS', filters })
    },
    resetFilters: () => {
      dispatch({ type: 'RESET_FILTERS' })
    }
  }), [])

  return (
    <FilterContext.Provider value={{ filtersState, filtersService }}>
      {children}
    </FilterContext.Provider>
  )
}
