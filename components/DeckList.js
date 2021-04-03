import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { getDecks } from '../utils/helpers'
import DeckInfo from './DeckInfo'

const DeckList = props => {
  const [data, setData] = useState('')
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  useEffect(() => {
  	const unsubscribe = navigation.addListener('focus', () => {
     	getDecks().then(newData => setData(data => newData))
    })

  	getDecks().then(newData => setData(data => newData))

    return unsubscribe;

  }, [navigation])

  const renderItem = ({ item }) => {
  	return <DeckInfo title={item.title} navigation={navigation} border={true} />; 
  }

  return (
    <View style={{flex: 1}}>
    	<FlatList 
    		data={ data ? Object.values(data) : null }
    		renderItem={renderItem}
    		keyExtractor={item => item.title}
    	/>
    </View>
  );
}

export default DeckList