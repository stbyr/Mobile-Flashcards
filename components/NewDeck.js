import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'

class NewDeck extends React.Component {
  state = {
    input: "" 
  }

  handleTextChange = (input) => {
    this.setState(() => ({
      input 
    }))
  }

  render() {
    const { input } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput 
          style={styles.input}
          onChangeText={this.handleTextChange}
          value={input}
          placeholder="Deck Title"
        />
        <TouchableOpacity style={styles.btn} onPress={() => console.log('Submit')}>
          <Text style={styles.btnText}>Submit</Text>
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
  text: {
    fontSize: 32,
    textAlign: 'center',
    padding: 30,
  },
  btn: {
    backgroundColor: '#36008c',
    padding: 14,
    paddingLeft: 26,
    paddingRight: 26,
    borderRadius: 5,
    marginTop: 70,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    width: 370,
    height: 50,
    borderRadius: 5,
    padding: 14,
    fontSize: 16,
  }
});

export default NewDeck