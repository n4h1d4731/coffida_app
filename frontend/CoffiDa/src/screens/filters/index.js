import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { Picker } from '@react-native-picker/picker'

// import required providers
import { useFilters } from '_providers/filters'

// import required styles
import { Colors, GlobalStyles } from '_styles'

export default function Filters ({ navigation }) {
  const [newFilters, setNewFilters] = useState({})

  const { filtersState, filtersService } = useFilters()

  const handleApplyChanges = () => {
    const filters = { ...newFilters }
    for (const filter in filters) {
      if (filters[filter] === '') delete filters[filter]
    }
    filtersService.updateFilters(filters)
    navigation.navigate('Locations')
  }

  const handleRevertChanges = () => {
    setNewFilters(filtersState)
  }

  const handleResetFilters = () => {
    filtersService.resetFilters()
    navigation.navigate('Locations')
  }

  useEffect(() => {
    setNewFilters(filtersState)
  }, [])

  return (
    <View style={GlobalStyles.screenWrapper}>
      <View>
        <Input
          label='Town:'
          onChangeText={(q => setNewFilters(prevFilters => ({ ...prevFilters, q })))}
          value={newFilters.q}
          style={GlobalStyles.input}
        />
        <Input
          label='Overall Rating: (Max 5)'
          keyboardType='numeric'
          onChangeText={(overallRating => setNewFilters(prevFilters => ({ ...prevFilters, overall_rating: overallRating })))}
          value={newFilters.overall_rating}
          style={GlobalStyles.input}
        />
        <Input
          label='Price Rating: (Max 5)'
          keyboardType='numeric'
          onChangeText={(priceRating => setNewFilters(prevFilters => ({ ...prevFilters, price_rating: priceRating })))}
          value={newFilters.price_rating}
          style={GlobalStyles.input}
        />
        <Input
          label='Quality Rating: (Max 5)'
          keyboardType='numeric'
          onChangeText={(qualityRating => setNewFilters(prevFilters => ({ ...prevFilters, quality_rating: qualityRating })))}
          value={newFilters.quality_rating}
          style={GlobalStyles.input}
        />
        <Input
          label='Cleanliness Rating: (Max 5)'
          keyboardType='numeric'
          onChangeText={(cleanlinessRating => setNewFilters(prevFilters => ({ ...prevFilters, clenliness_rating: cleanlinessRating })))}
          value={newFilters.clenliness_rating}
          style={GlobalStyles.input}
        />
        <Text style={{ color: 'grey', fontWeight: 'bold' }}>Search In:</Text>
        <Picker
          onValueChange={searchIn => setNewFilters(prevLocations => ({ ...prevLocations, search_in: searchIn }))}
          selectedValue={newFilters.search_in}
          style={GlobalStyles.input}
        >
          <Picker.Item label='All' value='' />
          <Picker.Item label='Favourite' value='favourite' />
          <Picker.Item label='Reviewed' value='reviewed' />
        </Picker>
      </View>
      <View style={{ justifyContent: 'flex-end' }}>
        <Button
          title='Apply Changes'
          type='solid'
          buttonStyle={{ backgroundColor: Colors.PRIMARY_LIGHT_COLOR }}
          titleStyle={{ color: Colors.PRIMARY_TEXT_COLOR }}
          onPress={handleApplyChanges}
        />
        <Button
          title='Revert Changes'
          type='clear'
          titleStyle={{ color: Colors.PRIMARY_TEXT_COLOR }}
          onPress={handleRevertChanges}
        />
        <Button
          title='Reset Filters'
          type='clear'
          titleStyle={{ color: Colors.PRIMARY_TEXT_COLOR }}
          onPress={handleResetFilters}
        />
      </View>
    </View>
  )
}
