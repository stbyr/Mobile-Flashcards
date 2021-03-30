import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

function Score (props) {
    const { score, numQuestions, reset } = props
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <Text style={styles.text}>You answered {score} out of {numQuestions} questions correctly!</Text>
        <View>
          <TouchableOpacity 
            style={[styles.btn, {marginTop: 60}]}
            onPress={() => reset()}
          >
            <Text style={styles.btnText}>Repeat this quiz</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity 
            style={styles.btn}
            onPress={() => navigation.navigate('udacicards')}
          >
            <Text style={styles.btnText}>Go back to all decks</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
  },
  btn: {
      backgroundColor: '#36008c',
      padding: 14,
      paddingLeft: 26,
      paddingRight: 26,
      borderRadius: 5,
      marginBottom: 20,
      minWidth: 234,
  },
  btnText: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center'
  },
});

export default Score