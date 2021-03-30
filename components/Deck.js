import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import DeckInfo from './DeckInfo'

class Deck extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <DeckInfo title="React" />
        <TouchableOpacity 
        	style={styles.btn}
        	onPress={() => this.props.navigation.navigate('NewQuestion')}
        >
        	<Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        	style={[styles.btn, {marginBottom: 200}]}
        	onPress={() => this.props.navigation.navigate('Quiz')}
        >
        	<Text style={styles.btnText}>Start Quiz</Text>
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
});

export default Deck