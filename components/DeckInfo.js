import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { getDecks } from '../utils/helpers'

const DeckInfo = props => {
  const [data, setData] = useState('')
  const { title } = props 
  const numCards = data[title] ? data[title].questions.length : null
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const fadeAnim = new Animated.Value(-10)

  useEffect(() => {
  	const unsubscribe = navigation.addListener('focus', () => {
     	getDecks().then(newData => setData(data => newData))
    });

    getDecks().then(newData => setData(data => newData))

    return unsubscribe;

  }, [isFocused])

  const handleClick = function() {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true, }),
      Animated.timing(fadeAnim, { toValue: -10, duration: 200, useNativeDriver: true, })
    ]).start()
      
  	setTimeout(function(){
  		navigation.navigate('Deck', {
		  	title: title
		})
  	}, 400)  
  }

  return (
    <Animated.View style={[props.border ? styles.border : styles.container, { transform: [{ translateY: fadeAnim }] }]}>
      <TouchableOpacity onPress={handleClick} disabled={props.border ? false : true}>
        <Text style={[styles.title]}>{title ? title : null}</Text>
        <Text style={styles.numQuestions}>{numCards} {numCards === 1 ? "card" : "cards"}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  border: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    borderBottomWidth: 1,
    borderColor: 'grey',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
  	paddingTop: 30,
  	paddingBottom: 10, 
    fontSize: 40,
  },
  numQuestions: {
  	fontSize: 28,
  	textAlign: 'center',
    color: 'grey'
  }
})

export default DeckInfo