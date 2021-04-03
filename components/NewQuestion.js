import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { addCardToDeck } from '../utils/helpers'

class NewQuestion extends React.Component {
  state = {
    inputQuestion: '',
    inputAnswer: '', 
  }

  handleTextChangeQuestion = (input) => {
    this.setState(() => ({
      inputQuestion: input 
    }))
  };

  handleTextChangeAnswer = (input) => {
    this.setState(() => ({
      inputAnswer: input  
    }))
  };

  navigate = () => {
    this.props.navigation.navigate('Deck', {
      title: this.props.route.params.title
    })
  };

  onSubmit = () => {
    const { inputQuestion, inputAnswer } = this.state

    if (!inputQuestion || !inputAnswer) {
      return alert('Please enter a question and an answer');
    }

    addCardToDeck(this.props.route.params.title, inputQuestion, inputAnswer, this.navigate)
  };

  render() {
    const { inputQuestion, inputAnswer } = this.state

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TextInput 
          style={styles.input}
          onChangeText={this.handleTextChangeQuestion}
          value={inputQuestion}
          placeholder="Type in a question"
        />
        <TextInput 
          style={styles.input}
          onChangeText={this.handleTextChangeAnswer}
          value={inputAnswer}
          placeholder="Type in the correct answer"
        />
        <TouchableOpacity 
        	style={styles.btn}
          onPress={this.onSubmit}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    width: 350,
    height: 50,
    borderRadius: 5,
    padding: 14,
    fontSize: 16,
    marginBottom: 40,
  }
})

export default NewQuestion