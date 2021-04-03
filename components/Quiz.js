import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { getDeck, clearLocalNotification, setLocalNotification } from '../utils/helpers'
import QuizQuestion from './QuizQuestion'
import QuizAnswer from './QuizAnswer'
import Score from './Score'

class Quiz extends React.Component {
  state = {
  	showQuestion: true,
  	score: 0,
  	numQuestionsAnswered: 0,
  	data: '',
  }

  componentDidMount() {
  	getDeck(this.props.route.params.title).then(data => this.setState(() => ({
  		data 
  	})))
  }

  toggleShowQuestion = () => {
  	this.setState((state) => ({
  		showQuestion: !state.showQuestion
  	}))
  };

  correct = () => {
  	this.setState((state) => ({
  		score: state.score + 1,
  		numQuestionsAnswered: state.numQuestionsAnswered + 1,
  		showQuestion: true,
  	}))
  };

  incorrect = () => {
  	this.setState((state) => ({
  		numQuestionsAnswered: state.numQuestionsAnswered + 1,
  		showQuestion: true,
  	}))
  };

  reset = () => {
  	this.setState((state) => ({
  		numQuestionsAnswered: 0,
  		score: 0,
  	}))
  };

  clearAndSetNotification = () => {
    clearLocalNotification()
      .then(setLocalNotification())
    };

  render() {
    const { showQuestion, numQuestionsAnswered, score, data } = this.state

    if (data && numQuestionsAnswered === data.questions.length) {
    	this.clearAndSetNotification()
      return (
    		<Score score={score} numQuestions={data.questions.length} reset={this.reset} title={data.title} />
    	);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.score}>{numQuestionsAnswered + 1} / { data ? data.questions.length : null}</Text>
        {showQuestion 
        	? <View> 
        		<QuizQuestion data={data} numQuestionsAnswered={numQuestionsAnswered} /> 
        	  	<TouchableOpacity onPress={this.toggleShowQuestion}>
        	  		<Text style={styles.text}>Answer</Text>
        	  	</TouchableOpacity>
        	  </View>
        	: <View>
        		<QuizAnswer data={data} numQuestionsAnswered={numQuestionsAnswered} />
        	  	<TouchableOpacity onPress={this.toggleShowQuestion}>
        	  		<Text style={styles.text}>Question</Text>
        	  	</TouchableOpacity>
        	  </View>
        }
        <TouchableOpacity 
        	style={[styles.btn, {backgroundColor: "green"}]}
        	onPress={this.correct}
        >
        	<Text style={styles.btnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        	style={[styles.btn, {backgroundColor: "red"}]}
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
})

export default Quiz