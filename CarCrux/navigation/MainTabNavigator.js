import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import VideosScreen from '../screens/VideosScreen';



const HomeStack = createStackNavigator({
  Home: HomeScreen,
  
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-speedometer${focused ? '' : '-outline'}`
          : 'md-speedometer'
      }
      
    />
    
  ),
  tabBarOptions:{
    activeTintColor: 'white',
    inactiveTintColor: '#595478',
    activeBackgroundColor: '#595478',
    inactiveBackgroundColor: '#D8E1FF'
  }
};

const HistoryStack = createStackNavigator({
  History: HistoryScreen,
});

HistoryStack.navigationOptions = {
  tabBarLabel: 'History', 
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-build${focused ? '' : '-outline'}` : 'md-build'}
    />
  ),
  tabBarOptions:{
    activeTintColor: 'white',
    inactiveTintColor: '#595478',
    activeBackgroundColor: '#595478',
    inactiveBackgroundColor: '#D8E1FF'
  }
};

const VideosStack = createStackNavigator({
  Videos: VideosScreen,
});

VideosStack.navigationOptions = {
  tabBarLabel: 'Videos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `logo-youtube${focused ? '' : '-outline'}` : 'logo-youtube'}
    />
  ),
  tabBarOptions:{
    activeTintColor: 'white',
    inactiveTintColor: '#595478',
    activeBackgroundColor: '#595478',
    inactiveBackgroundColor: '#D8E1FF'
  },

};

export default createBottomTabNavigator({
  HomeStack,
  HistoryStack,
  VideosStack,

});
