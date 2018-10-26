# Capstone Project - CARCRUX
Cordell Radke - Web Application Integrations
## Documentation
[Docs](https://github.com/CordellRadke/capstone/tree/dev/docs)

#  CarCrux
Many Young Adults struggle to make car payments and lack the skills to take care of their vehicles that drive them to work everyday. This Car Crux App should help those learn the crux of their Vehicle's most common issues to keep them safe on the road and drive another day. This app aims to keep track of their latest payments and repairs through adding their own records. This way they can stay organized and keep track of when they should be getting that next oil change. On top of that, this app will provide them with the simple knowledge needed to keep their Vehicles in tip-top shape with YouTube video tutorials.

## Technologies Used

* [apisauce](https://github.com/infinitered/apisauce): ^0.14.0,
* [axios](https://github.com/axios/axios): ^0.17.1,
* [firebase](https://firebase.google.com/docs/): ^4.6.2,
* [react-native](https://facebook.github.io/react-native/docs/getting-started.html): 0.49.3,
* [redux](https://redux.js.org/basics/usagewithreact): ^3.6.0,

## Firebase Setup

In App.js file of CarCrux we must initialize the firebase connection...

```
class App extends Component {
  state = { loggedIn: null };


  componentWillMount() {
    firebase.initializeApp({
      apiKey: "YOUR API KEY GOES HERE",
      authDomain: "react-native-carcrux.firebaseapp.com",
      databaseURL: "https://react-native-carcrux.firebaseio.com",
      projectId: "react-native-carcrux",
      storageBucket: "react-native-carcrux.appspot.com",
      messagingSenderId: "1028296495338"
    });


  }
```
## How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn` or `npm i`


## How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Android Studio Emulator
    * run `react-native run-android`
 
 ## If any error messages occur at startup try the following...

1. Click "Reset content and settings..." in the simulator's drop down menu and confirm
2. Close the simulator after it reloads
3. Close the terminal window running watchman
4. Run the following commands within terminal inside of your project's directory:

```
watchman watch-del-all
rm -rf ./node_modules
npm cache clean
yarn cache clean
rm -rf $TMPDIR/react-*
yarn install
npm cache clean
yarn cache clean
yarn add uuid

```



