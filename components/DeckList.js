import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import DeckInfo from './DeckInfo'

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

class DeckList extends React.Component {
  renderItem = ({ item }) => {
  	return <DeckInfo title={item.title} navigation={this.props.navigation} /> 
  }

  render() {
    return (
      <View style={{flex: 1}}>
      	<FlatList 
      		data={Object.values(data)}
      		renderItem={this.renderItem}
      		keyExtractor={item => item.title}
      	/>
      </View>
    );
  }
}

export default DeckList