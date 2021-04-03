import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import DeckInfo from './DeckInfo'
import { getDecks, clearLocalNotification, setLocalNotification  } from '../utils/helpers'

function Deck ({ route, navigation }) {
    const [data, setData] = useState('')
    const title = route.params.title
    const numCards = data[title] ? data[title].questions.length : null
    const isFocused = useIsFocused()

  	useEffect(() => {
	  	const unsubscribe = navigation.addListener('focus', () => {
	     	getDecks().then(newData => setData(data => newData))
	    })

	    return unsubscribe;

  	}, [isFocused])

  	useEffect(() => {
	    isFocused ? getDecks().then(newData => setData(data => newData)) : null
  	}, [isFocused])

  	const onQuizStart = function() {
  		clearLocalNotification()
			.then(setLocalNotification())

  		navigation.navigate('Quiz', {
        	title: route.params.title
        })
  	}

    return (
      	<View style={styles.container}>
	        <DeckInfo title={route.params.title} />
	        <TouchableOpacity 
	        	style={styles.btn}
	        	onPress={() => navigation.navigate('NewQuestion', {
	        		title: route.params.title
	        	})}
	        >
	        	<Text style={styles.btnText}>Add Card</Text>
	        </TouchableOpacity>
	        <TouchableOpacity disabled={numCards === 0} 
	        	style={[numCards === 0 ? styles.disabledBtn : styles.btn, {marginBottom: 200}]}
	        	onPress={onQuizStart}
	        >
	        	<Text style={numCards === 0 ? styles.disabledBtnText : styles.btnText}>Start Quiz</Text>
	        </TouchableOpacity>
      	</View>
    );
}

const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: 'white',
  	},
  	btn: {
	    backgroundColor: '#36008c',
	    padding: 14,
	    paddingLeft: 26,
	    paddingRight: 26,
	    borderRadius: 5,
	    marginBottom: 30,
	},
	btnText: {
	    color: 'white',
	    fontSize: 20,
	},
	disabledBtn: {
		backgroundColor: 'white',
		borderWidth: 2,
		borderColor: '#b69ae3',
	    padding: 14,
	    paddingLeft: 26,
	    paddingRight: 26,
	    borderRadius: 5,
	    marginBottom: 30,
	},
	disabledBtnText: {
		color: '#b69ae3',
		fontSize: 20
	}
})

export default Deck