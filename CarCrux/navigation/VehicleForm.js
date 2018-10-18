import React from "react"
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView} from "react-native"
import { androidClientId} from "../components/superSecretKey"
import Expo from "expo"
import Icon from 'react-native-vector-icons/FontAwesome'

import MainTabNavigator from './MainTabNavigator';

import AppSignUpButton from './AppSignUp';


export default class VehicleForm extends React.Component {

    static navigationOptions = {
        title: 'VehicleForm',
    };


   
    
        render(){

            return (
                
        
                    <View style={styles.signUp}>
                        <Button title="Submit Vehicle Registration" onPress={ ()=> this.props.navigation.navigate('AddVehicle')}/>
                    </View>
  
    
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
