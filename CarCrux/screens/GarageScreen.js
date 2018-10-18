import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import Expo from "expo"
import Icon from 'react-native-vector-icons/FontAwesome'

import { MonoText } from '../components/StyledText';

export default class GarageScreen extends React.Component {
  static navigationOptions = {
    title: 'GARAGE',
    headerStyle:{
      backgroundColor: '#D8E1FF'
    },
    headerTitleStyle:{
      color: '#595478',
      paddingLeft: 135
    }
  };

  render() {
    return (
    
         <View style={styles.button}> 
            <Icon.Button onPress={ ()=> this.props.navigation.navigate('ViewVehicleForm')} name='plus-square' size={100} color='grey' backgroundColor='white' > 
            ADD VEHICLE
            </Icon.Button>
          </View>

     
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },

  button:{

    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',


  }
});
