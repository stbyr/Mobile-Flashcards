import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const data = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

class DeckInfo extends React.Component {
  render() {
    const { title } = this.props
    const numQuestions = data[title].questions.length

    return (
      <View style={styles.container}>
	      <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck')}>
	        <Text style={styles.title}>{title}</Text>
	        <Text style={styles.numQuestions}>{numQuestions} {numQuestions === 1 ? 'card' : 'cards'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'grey',
    padding: 40,
  },
  title: {
  	fontSize: 40,
  	paddingTop: 30,
  	paddingBottom: 10,
  },
  numQuestions: {
  	fontSize: 28,
  	color: 'grey',
  	textAlign: 'center',
  }
});

export default DeckInfo