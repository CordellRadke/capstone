import React from "react"
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView, TouchableOpacity} from "react-native"
import { androidClientId} from "../components/superSecretKey"
import Expo from "expo"
import Icon from 'react-native-vector-icons/FontAwesome'
import { createStackNavigator } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';


import HomeScreen from '../screens/HomeScreen';


export default class AppSignUpButton extends React.Component {
    
    constructor(props){
        super(props)
      }
      render(){
        return(
          <TouchableOpacity
          onPress={this.props.onPress}
          >
            <Text style={{fontFamily: 'sans-serif', fontSize: 30, color: 'white'}}> Skip Login > </Text>
          </TouchableOpacity>
        )
      }
        
    
 }

   







  