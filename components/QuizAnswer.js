import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function QuizAnswer (props) {
  const { data, numQuestionsAnswered } = props
  const numQuestions = data ? data.questions.length : null

  return (
    <View>
      <Text style={styles.text}>{data ? data.questions[numQuestionsAnswered].answer : null}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    textAlign: 'center',
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
  }
})

export default QuizAnswer