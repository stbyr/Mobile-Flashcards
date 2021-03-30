import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import QuizQuestion from './QuizQuestion'
import QuizAnswer from './QuizAnswer'
import Score from './Score'

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

class Quiz extends React.Component {
  state = {
  	showQuestion: true,
  	score: 0,
  	numQuestionsAnswered: 0,
  }

  toggleShowQuestion = () => {
  	this.setState((state) => ({
  		showQuestion: !state.showQuestion
  	}))
  }

  correct = () => {
  	this.setState((state) => ({
  		score: state.score + 1,
  		numQuestionsAnswered: state.numQuestionsAnswered + 1
  	}))
  }

  incorrect = () => {
  	this.setState((state) => ({
  		numQuestionsAnswered: state.numQuestionsAnswered + 1
  	}))
  }

  reset = () => {
  	this.setState((state) => ({
  		numQuestionsAnswered: 0
  	}))
  }

  render() {
    const { showQuestion, numQuestionsAnswered, score } = this.state

    if (numQuestionsAnswered === data['React'].questions.length) {
    	return (
    		<Score score={score} numQuestions={data['React'].questions.length} reset={this.reset} />
    	)
    }

    return (
      <View style={styles.container}>
        <Text style={styles.score}>{numQuestionsAnswered} / {data['React'].questions.length}</Text>
        {showQuestion 
        	? <View> 
        		<QuizQuestion /> 
        	  	<TouchableOpacity onPress={this.toggleShowQuestion}>
        	  		<Text style={styles.text}>Answer</Text>
        	  	</TouchableOpacity>
        	  </View>
        	: <View>
        		<QuizAnswer />
        	  	<TouchableOpacity onPress={this.toggleShowQuestion}>
        	  		<Text style={styles.text}>Question</Text>
        	  	</TouchableOpacity>
        	  </View>
        }
        <TouchableOpacity 
        	style={[styles.btn, {backgroundColor: 'green'}]}
        	onPress={this.correct}
        >
        	<Text style={styles.btnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        	style={[styles.btn, {backgroundColor: 'red'}]}
        	onPress={this.incorrect}
        >
        	<Text style={styles.btnText}>Incorrect</Text>
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
    	fontSize: 22,
    	textAlign: 'center',
    	padding: 10,
    	marginBottom: 80,
    	color: 'red'
    },
    btn: {
      padding: 14,
      paddingLeft: 26,
      paddingRight: 26,
      borderRadius: 5,
      marginBottom: 30,
      minWidth: 150,
  },
  btnText: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center'
  },
  score: {
  	color: 'grey',
  	position: 'absolute',
  	top: 16,
  	left: 16,
  	fontSize: 22,
  }
});

export default Quiz