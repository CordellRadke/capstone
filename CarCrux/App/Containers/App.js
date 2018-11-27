import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import appStoreCreate from '../Redux/app-create-store'
import * as firebase from 'firebase';
import { Root } from "native-base";
import SplashScreen from 'react-native-splash-screen';

// create our store
const store = appStoreCreate()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 * 
 * We also intialize the firebase connection
 */


class App extends Component {
  
  componentDidMount(){

    SplashScreen.hide();

  }
  
  
  
  
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBOXg7wxOkIr52T64W4Uztfo_zilXsJy2s",
      authDomain: "react-native-carcrux.firebaseapp.com",
      databaseURL: "https://react-native-carcrux.firebaseio.com",
      projectId: "react-native-carcrux",
      storageBucket: "react-native-carcrux.appspot.com",
      messagingSenderId: "1028296495338"
    });


  }


  render() {
    console.disableYellowBox = true;

    console.ignoredYellowBox = ['Remote debugger'];
    return (
      <Provider store={store}>
        <Root>
          <RootContainer />
        </Root>
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
