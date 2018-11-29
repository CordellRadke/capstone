#  CarCrux
Many Young Adults struggle to make car payments and lack the skills to take care of their vehicles that drive them to work everyday. This Car Crux App should help those learn the crux of their Vehicle's most common issues to keep them safe on the road and drive another day. This app aims to keep track of their latest payments and repairs through adding their own records. This way they can stay organized and keep track of when they should be getting that next oil change. On top of that, this app will provide them with the simple knowledge needed to keep their Vehicles in tip-top shape with YouTube video tutorials.

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




