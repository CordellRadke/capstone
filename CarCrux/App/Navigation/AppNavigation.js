import { StackNavigator } from 'react-navigation'
import { Animated, Easing } from 'react-native'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import HomeScreen from '../Containers/HomeScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import VehicleCreateScreen from '../Containers/VehicleCreateScreen'
import YouTubeScreen from '../Containers/YouTubeScreen'
import NoteScreen from '../Containers/NoteScreen'
import NoteDetailsScreen from '../Containers/NoteDetailsScreen'

import styles from './Styles/NavigationStyles'


// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen },
  HomeScreen: { screen: HomeScreen },
  SignUpScreen: { screen: SignUpScreen },
  SettingsScreen: { screen: SettingsScreen },
  VehicleCreateScreen: { screen: VehicleCreateScreen },
  YouTubeScreen: { screen: YouTubeScreen },
  NoteScreen: { screen: NoteScreen},
  NoteDetailsScreen: { screen: NoteDetailsScreen}


}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
    navigationOptions: {
      headerStyle: styles.header
    },
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0,
    },
  },

  transitionConfig = () => ({
  }),


)

export default PrimaryNav
