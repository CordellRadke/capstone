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
  * Garage for Vehicles (Add or Delete)
  * Dashboard main hub for Vehicle Details and "Fix it now!" button
  * History view for List of user inputted Notes (oil change, tire change, light bulb replacement, etc.)
  * Video Tutorials view for tutorials on car maintenance (Tutorials on how to change a tire, oil change, etc.)

  
## Sitemap
  ### Splash Screen
  When app loads and app title is displayed
  After it loads the next screen will be the Login/Sign up view
   ```
   - CARCRUX -> Login/SignUp
   ```
  ### Login/SignUp
  User will be asked to login or signup
  After signing/logging in the next screen will be the garage view
  ```
   - Login -> Garage
   - SignUp -> Sign-Up Form -> Garage
   ```
  ### Garage
  User can add or delete a vehicle
  When adding... 
  ```
   - addButton -> vehicleDataForm -> (updated)Garage
  Garage when vehicle has been added...
   - vehicleData(delete button)
   - delete -> (Updated)GARAGE
   - settingsButton -> addNew or Logout
   ```
   Note: if user wants to add another vehicle they can click settings button and add another vehicle.
  ### Dashboard
  User can touch "Fix it Now" button
  ```
   - FixitNowButton -> YouTubeVideosView
    
    Tab Bar (Footer)
   - History -> maintenanceView
   - Garage -> garageView
   ```
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
   ```
   - vehicleData(Delete button)
   - delete -> (Updated)GARAGE
   - addButton -> vehicleDataForm: Make, Model, Year, Style, Trim(optional)-> Dashboard
   ```   
   ### Dashboard
    - "Fix it now!" button -> YouTube Tutorial View -> Search Video Form 
   Bottom Navigation
     Tab Bar (Footer)
   - History -> maintenanceView
   - Garage -> garageView
         
         (coming soon) - find shop 
  ### Browser Support
 
  Currently, App will be subjected to portrait mode for Android and IOS. 
 
 ## Infrastructure
 
   ### Technical Requirements

   - [Firebase](https://console.firebase.google.com/u/1/) for storing vehicle and user data
   - Android Studio (Emulator)
   - Local Web Server
   - [Firebase](https://firebase.google.com/) for User data
   
   ### Programming Languages
   - [React Native](https://facebook.github.io/react-native/docs/getting-started)
   
   ### Integrations
   - [CarQuery API](http://www.carqueryapi.com/) for lists of makes, models, and styles

   
   ### Deployment Workflow
   
   First, will be developed in feature branches and then merged to dev/master branches. App will be deployed through the [Google Play Store](https://developer.android.com/distribute/console/) using [Android APK](https://facebook.github.io/react-native/docs/removing-default-permissions). This app will be tested locally for the Android version. Later will be deployed for IOS devices.
