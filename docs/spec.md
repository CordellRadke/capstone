# Table of Contents

* Spec
    * [Feature Definitions](#feature-definitions)
    * [Sitemap](#sitemap)
    * [Interface](#interface)
        * [Information Architecture](#information-architecture)
        * [Browser Support](#browser-support)
    * [Infrastructure](#infrastructure)
        * [Technical Requirements](#technical-requirements)
        * [Programming Languages](#programming-languages)
        * [Integrations](#integrations)
        * [Deployment Workflow](#deployment-workflow)

# Spec

## Feature Definitions
[Filter of Github Features](https://github.com/CordellRadke/capstone/issues)
  * Splash Screen
  * Initial Login/Sign-Up Screen
  * Garage view for Vehicles (Add, View, or Delete)
  * Dashboard view main hub for Vehicle information
  * History view for List of user inputted reports (oil change, tire change, light bulb replacement, etc.)
  * Tutorials view for tutorials on car maintenance (Tutorials on how to change a tire, oil change, etc.)
  
## Sitemap
  ### Splash Screen
  When app loads and app title is displayed
  After it loads the next screen will be the Login/Sign up view
   - CARCRUX -> Login/SignUp
  ### Login/SignUp
  User will be asked to login or signup
  After signing/logging in the next screen will be the garage view
   - Login -> Garage
   - SignUp -> Sign-Up Form -> Garage
  ### Garage
  User can add, view, or delete a vehicle
  When adding...
   - addButton -> vehicleDataForm -> (updated)Garage
  Garage when vehicle has been added...
   - vehicleData(view & delete buttons)
   - view -> Dashboard
   - delete -> (Updated)GARAGE
  ### Dashboard
  User can view history, garage, or videos
   - history -> historyView
   - garage -> garageView
   - videos -> videoView
## Interface
  ### Information Architecture
   ### Splash Screen
   - CARCRUX -> Login/SignUp
   ### Login/SignUp
   - Login -> Garage
   - SignUp -> Sign-Up Form: Email & Password -> Garage
   ### Garage
   - vehicleData(View/Delete buttons)
   - view -> Dashboard
   - delete -> (Updated)GARAGE
   - addButton -> vehicleDataForm: Make, Model, Year, Style, Trim(optional)-> Dashboard   
   ### Dashboard
   <- (back button) Inputted Vehicle Details at the top of view
   - Vehicle efficiency levels from red to yellow to green
   - Oil Change (Add Record) -> Form: approx Date & Mileage (Add) -> Dashboard
   - Tire Rotation (Add Record) -> Form: approx Date & Mileage (Add) -> Dashboard   
   Bottom Navigation
      - history -> historyView -> Add Record -> Form: Serviced Category(oilchange, tire rotation, etc.), Date, Mileage(Add Record)-> (updated)historyView 
      - costs -> costsView -> Cost and Labor diagram of estimates -> Dashboard
      - videos -> videoView -> List of tutorial Videos on basic car maintenance <-(back button) -> Dashboard
         
         (coming soon) - find shop 
  ### Browser Support
 
  Currently, App will be subjected to portrait mode for Android and IOS. Browser support will be added in later versions.
 
 ## Infrastructure
 
   ### Technical Requirements
   - AsyncStorage for storing vehicle data
   - Android Studio (Emulator)
   - Local Web Server
   - [Firebase](https://firebase.google.com/) for User data
   
   ### Programming Languages
   - [React Native](https://facebook.github.io/react-native/docs/getting-started)
   
   ### Integrations
   - [Vehicle API](http://www.carqueryapi.com/) for lists of makes, models, and styles
   
   ### Deployment Workflow
   
   First, will be developed in feature branches and then merged to dev/master branches. App will be deployed through the [Google Play Store](https://developer.android.com/distribute/console/) using [Android APK](https://facebook.github.io/react-native/docs/removing-default-permissions). This app will be tested locally for the Android version. Later will be deployed for IOS devices.
