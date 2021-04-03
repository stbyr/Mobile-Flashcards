import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'

const FLASHCARDS_KEY = '@UdaciCards_data'
const NOTIFICATION_KEY = '@UdaciCards_notification'

export function saveDeckTitle(title, navigateFunction) {
	const newDeck = {
    	title: title,
    	questions: []
	}
	const firstData = {
		[title]: {
			title: title,
			questions: []
		}
	}

	AsyncStorage.getItem(FLASHCARDS_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data !== null) {
			  	const newData = data 
			  	newData[title] = newDeck
			  	AsyncStorage.mergeItem(FLASHCARDS_KEY, JSON.stringify(newData))
			} else {
				AsyncStorage.setItem(FLASHCARDS_KEY, JSON.stringify(firstData))
			}
		})
		.then(() => navigateFunction(title))
}

export function addCardToDeck(title, question, answer, navigateFunction) {
	const newQuestion = {
		question: question,
		answer: answer 
	}

	AsyncStorage.getItem(FLASHCARDS_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data !== null) {
				const newData = data 
				newData[title].questions.push(newQuestion) 
				AsyncStorage.mergeItem(FLASHCARDS_KEY, JSON.stringify(newData))
			} else {
				alert('There are no decks yet. Please create a new deck first.')
			}
		})
		.then(() => navigateFunction())
}

export function getDecks() {
	return AsyncStorage.getItem(FLASHCARDS_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data !== null) { 
				return data; 
			} else {
				return null; 
			}
		})
}

export function getDeck(title) {
	return AsyncStorage.getItem(FLASHCARDS_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data !== null) {
				if (data[title]) {
					return data[title];
				} else {
					return null;
				} 
			} else {
				return null;
			}
		})
}

export function clearLocalNotification () {
  	return AsyncStorage.removeItem(NOTIFICATION_KEY)
    	.then(Notifications.cancelAllScheduledNotificationsAsync)
    	.catch((e) => console.log(e))
}

export function setLocalNotification () {
  	AsyncStorage.getItem(NOTIFICATION_KEY)
    	.then(JSON.parse)
    	.then((data) => {
      		if (data === null) {
        		Permissions.askAsync(Permissions.NOTIFICATIONS)
          			.then(({ status }) => {
            			if (status === 'granted') {
              				Notifications.cancelAllScheduledNotificationsAsync()

              				Notifications.scheduleNotificationAsync({
				              	content: {
				              		title: 'Practice with udacicards today!',
				              		body: "Don't forget to practice with udacicards today!",
				              	},
				              	trigger: {
				              		hour: 17,
				          			repeat: true
				              	},
				              	ios: {
							      	sound: true,
							    },
							    android: {
							      	sound: true,
							      	priority: 'high',
							      	sticky: false,
							      	vibrate: true,
							    }
              				})

              				AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            			}
          			})
          			.catch((e) => console.log(e))
      		}
    	})
}