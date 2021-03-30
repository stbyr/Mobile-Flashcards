import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

class QuizAnswer extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.text}>Yes!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    textAlign: 'center',
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
  }
});

export default QuizAnswer