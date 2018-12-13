# Capstone Project - CARCRUX
Cordell Radke - Web Application Integrations
## Documentation
[Docs](https://github.com/CordellRadke/capstone/tree/dev/docs)

#  CarCrux

Many Young Adults struggle to make car payments and lack the skills to take care of their vehicles that drive them to work everyday. This Car Crux App should help those learn the crux of their Vehicle's most common issues to keep them safe on the road and drive another day. This app aims to keep track of their latest payments and repairs through adding their own notes. This way they can stay organized and keep track of when they should be getting that next oil change. On top of that, this app will provide them with the knowledge needed to keep their Vehicles in tip-top shape with YouTube video tutorials. Once the user inputs their Vehicle data and touches the "Fix it Now!" button, the app will do the rest and retrieve every YouTube video on the specific topic (e.g. Oil Change) they inputted in the search bar pertaining to their specific vehicle.


## Technologies Used

* [apisauce](https://github.com/infinitered/apisauce): ^0.14.0,
* [axios](https://github.com/axios/axios): ^0.17.1,
* [firebase](https://firebase.google.com/docs/): ^4.6.2,
* [react-native](https://facebook.github.io/react-native/docs/getting-started.html): 0.49.3,
* [redux](https://redux.js.org/basics/usagewithreact): ^3.6.0,
* [youtube-api-search](https://www.npmjs.com/package/youtube-api-search): 0.0.5,


## Firebase Setup

In App.js file of CarCrux we must initialize the firebase connection...

Replace all Firebase info with your own...


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

## YouTube API Setup

In the YouTubeScreen.js file within the ```App/Containers``` directory we must add a key...

The key can be retrieved from your [GoogleAPIs](https://console.developers.google.com/projectselector/apis/credentials?supportedpurview=project) credentials page...

Once you have your key, add it to the ```searchYouTube()``` function...

```

searchYoutube() {


        YTSearch({ key: 'YourKEYgoesHERE', term: this.state.vehicle.model_year + ' ' + this.state.vehicle.make_display + ' ' + this.state.vehicle.model_name + ' ' + this.state.repairRequest }, result => {
            this.setState({ youtubeVideoResults: result }, function () {

                console.log('firing search youtube', this.state);
            })
        });

    }


```



## How to Setup

**Step 1:** git clone this repo

**Step 2:** cd to the cloned repo

**Step 3:** Install the Application with `yarn` or `npm i`


## How to Run App

### Run Build for Android
   
* Open [Android Studio](https://developer.android.com/studio/)
     * Open Android Studio terminal window 
     * Run `cd carcrux`
     * Run `npm start`
     * Run [Android Studio Emulator](https://developer.android.com/studio/run/emulator)

* Open [VSCODE](https://code.visualstudio.com/) or a code editor of your choice
     * Open VSCODE or your code editor's terminal window
     * Run `cd carcrux`
     * Run `react-native run-android`
 
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
