import React from 'react'
import { Button, Pressable, Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import GlobalStyles from '../styles/GlobalStyles'

export default function Filters ({ navigation, route }) {
  const [filters, setFilters] = React.useState({})

  React.useEffect(() => {
    if (route.params?.filters) {
      setFilters({ ...route.params?.filters })
    }
  }, [route.params?.filters])

  const onApplyFilters = () => {
    for (const filter in filters) {
      if (filters[filter] === '') delete filters[filter]
    }
    navigation.navigate('Locations', { filters: filters })
  }

  const onResetFilters = () => {
    navigation.navigate('Locations', { filters: {} })
  }

  const validateRating = (rating) => {
    return (/^([0-5].[0-9])$|^([0-5])$/).test(rating) === true ? rating : ''
  }

  return (
    <View style={GlobalStyles.contentWrapper}>
      <View style={{ flex: 0.6, flexDirection: 'column' }}>
        <View style={GlobalStyles.flexRow}>
          <Text style={GlobalStyles.textBoxTitle}>Town:</Text>
          <TextInput
            style={GlobalStyles.textInput}
            onChangeText={q => setFilters(prevLocations => ({ ...prevLocations, q: q }))}
            value={filters.q}
          />
        </View>
        <View style={GlobalStyles.flexRow}>
          <Text style={GlobalStyles.textBoxTitle}>Overall Rating: (Max 5)</Text>
          <TextInput
            style={GlobalStyles.textInput}
            keyboardType='numeric'
            onChangeText={overall_rating => setFilters(prevLocations => ({ ...prevLocations, overall_rating: validateRating(overall_rating) }))}
            value={filters.overall_rating}
          />
        </View>
        <View style={GlobalStyles.flexRow}>
          <Text style={GlobalStyles.textBoxTitle}>Price Rating: (Max 5)</Text>
          <TextInput
            style={GlobalStyles.textInput}
            keyboardType='numeric'
            onChangeText={price_rating => setFilters(prevLocations => ({ ...prevLocations, price_rating: validateRating(price_rating) }))}
            value={filters.price_rating}
          />
        </View>
        <View style={GlobalStyles.flexRow}>
          <Text style={GlobalStyles.textBoxTitle}>Quality Rating: (Max 5)</Text>
          <TextInput
            style={GlobalStyles.textInput}
            keyboardType='numeric'
            onChangeText={quality_rating => setFilters(prevLocations => ({ ...prevLocations, quality_rating: validateRating(quality_rating) }))}
            value={filters.quality_rating}
          />
        </View>
        <View style={GlobalStyles.flexRow}>
          <Text style={GlobalStyles.textBoxTitle}>Cleanliness Rating: (Max 5)</Text>
          <TextInput
            style={GlobalStyles.textInput}
            keyboardType='numeric'
            onChangeText={clenliness_rating => setFilters(prevLocations => ({ ...prevLocations, clenliness_rating: validateRating(clenliness_rating) }))}
            value={filters.clenliness_rating}
          />
        </View>
        <View style={GlobalStyles.flexRow}>
          <Text style={GlobalStyles.textBoxTitle}>Search In:</Text>
          <Picker
            style={GlobalStyles.textInput}
            onValueChange={search_in => setFilters(prevLocations => ({ ...prevLocations, search_in: search_in }))}
            selectedValue={filters.search_in}
          >
            <Picker.Item label='All' value='' />
            <Picker.Item label='Favourite' value='favourite' />
            <Picker.Item label='Reviewed' value='reviewed' />
          </Picker>
        </View>
      </View>
      <View style={{ flex: 1, marginBottom: 10, justifyContent: 'flex-end' }}>
        <Button title='Apply Filters' onPress={onApplyFilters} />
        <Pressable style={GlobalStyles.secondaryButton} onPress={onResetFilters}>
          <Text style={GlobalStyles.secondaryButtonText}>Reset All Filters</Text>
        </Pressable>
      </View>
    </View>
  )
}
