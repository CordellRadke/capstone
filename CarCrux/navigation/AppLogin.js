import React from "react"
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView} from "react-native"
import { androidClientId} from "../components/superSecretKey"
import Expo from "expo"
import Icon from 'react-native-vector-icons/FontAwesome'

import MainTabNavigator from './MainTabNavigator';

import AppSignUpButton from './AppSignUp';


export default class Login extends React.Component {

    static navigationOptions = {
        title: 'Login',
    };


    async signInWithGoogleAsync(){

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
                return result.accessToken;
               
              } else {
                console.log("cancelled")
              }
            } catch(e) {
              console.log("error", e)
            }
         
        }
    
        render(){

            return (
                <ImageBackground source={require('../assets/images/sign-in.png')} style={{width: '100%', height: '100%'}}>
                    <View style={styles.button}>
                        <Icon.Button name='google' size={25} color='white' onPress={this.signInWithGoogleAsync.bind(this)}>
                        <Text style={{fontFamily: 'sans-serif', fontSize: 20, color: 'white'}}>Sign in with Google</Text>
                        </Icon.Button>
                    </View>
                    <View style={styles.signUp}>
                        <AppSignUpButton title="Sign-Up" onPress={ ()=> this.props.navigation.navigate('AddVehicle')}/>
                    </View>
                </ImageBackground>
    
            );
        }
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
   signUp:{

    position: 'absolute', 
    top: 500, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',



   }
   
   
    
  })

