import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import GarageScreen from '../screens/GarageScreen';
import HistoryScreen from '../screens/HistoryScreen';
import VideosScreen from '../screens/VideosScreen';



const GarageStack = createStackNavigator({
  Garage: GarageScreen,
  
});

GarageStack.navigationOptions = {

    tabBarLabel: 'ADD VEHICLE',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-add-circle${focused ? '' : '-outline'}`
          : 'md-add-circle'
      }
      
    />
    
  ),
  tabBarOptions:{
    activeTintColor: 'white',
    inactiveTintColor: '#595478',
    activeBackgroundColor: '#595478',
    inactiveBackgroundColor: '#D8E1FF'
  }
  
}

export default createBottomTabNavigator({
  GarageStack,

});
