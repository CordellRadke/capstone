import React from "react"
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView} from "react-native"
import { androidClientId} from "../components/superSecretKey"
import Expo from "expo"
import Icon from 'react-native-vector-icons/FontAwesome'
import { createStackNavigator } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import HomeScreen from '../screens/HomeScreen';


export default class App extends React.Component {

//use creation parameter props in constructor
//use "super(props)" when you want to access this.props in constructor
    constructor(props){

        super(props)
        this.state ={
            signIn: false,
            name: "",
            photoUrl: ""
        }
    }

    signIn = async () => {
        
        try {
            const result = await Expo.Google.logInAsync({
                //use client id from components/superSecretKey.js file
                androidClientId: androidClientId,
                scopes: ['profile', 'email'],
              });
              //if user signs in correctly display their username and photo
              if (result.type === 'success') {
                  //continues to dashboard
                this.props.navigation.navigate('Main');
                // this.setState({
                //     signedIn: true,
                //     name: result.user.name,
                //     photoUrl: result.user.photoUrl

                // })
              } else {
               
                console.log("cancelled")
              }
            } catch(e) {
              console.log("error", e)
            }

            
        }
    
       
        
    render(){
        return  (

            <View style={styles.container}>
                {this.state.signedIn ? (
                    <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
                ) : (
                    <LoginPage signIn={this.signIn} />
                )}
            
            </View>
        )
    }
}



const LoginPage = props => {
    
    return (
      
        <ImageBackground source={require('../assets/images/sign-in.png')} style={{width: '100%', height: '100%'}}>
            <View style={styles.button}>
                <Icon.Button name='google' size={25} color='white' onPress={() => props.signIn()}>
                <Text style={{fontFamily: 'sans-serif', fontSize: 20, color: 'white'}}>Sign in with Google</Text>
                </Icon.Button>
            </View>
        </ImageBackground>
       
    )
}

const LoggedInPage = props => {

    return (
        <View style={styles.container} >
            <Text style={styles.header}>Welcome: {props.name}</Text>
            <Image style={styles.image} source={{ uri: props.photoUrl }} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "stretch",
      justifyContent: "center",
     
    },
    header: {
      fontSize: 25,
    },
    image: {
      marginTop: 15,
      width: 150,
      height: 150,
      borderColor: "rgba(0,0,0,0.2)",
      borderWidth: 3,
      borderRadius: 150
    },
   button:{
      position: 'absolute', 
      top: 80, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      justifyContent: 'center', 
      alignItems: 'center',
      
   },
   skip:{

    position: 'absolute', 
    top: 500, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',



   }
   
   
    
  })