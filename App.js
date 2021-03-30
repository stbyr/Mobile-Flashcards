import React from 'react'
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import Constants from 'expo-constants'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import NewDeck from './components/NewDeck'
import NewQuestion from './components/NewQuestion'
import Quiz from './components/Quiz'

const purple = '#36008c'

function MyStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

const Tab = 
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()

const TabNav = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({ color, size }) => {
        let icon;
        if (route.name === "Decks") {
          icon = (
            <MaterialCommunityIcons name="cards-outline" size={size} color={color} />
          );
        } else if (route.name === "New Deck") {
          icon = (
            <MaterialCommunityIcons name="card-plus-outline" size={size} color={color} />
          );
        } 
        return icon;
      }
    })}
    tabBarOptions={{
      header: null,
      activeTintColor: Platform.OS === "ios" ? purple : 'white',
      showIcon: true,
      style: {
        height: 80,
        backgroundColor: Platform.OS === "ios" ? 'white' : purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }}
  >
    <Tab.Screen name="Decks" component={DeckList} />
    <Tab.Screen name="New Deck" component={NewDeck} />
  </Tab.Navigator>
)

const Stack = createStackNavigator()
const MainNav = () => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name="udacicards"
      component={TabNav}
      options={{headerShown: false}} />
    <Stack.Screen
      name="Deck"
      component={Deck} />
    <Stack.Screen
      name="NewQuestion"
      component={NewQuestion} />
    <Stack.Screen
      name="Quiz"
      component={Quiz} />
  </Stack.Navigator>
)

class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationContainer>
          <MyStatusBar backgroundColor={purple} barStyle="light-content"/>
          <MainNav />
        </NavigationContainer>
      </View>
    );
  }
}

export default App
