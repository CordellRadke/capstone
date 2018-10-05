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
  * Garage for CRUD Vehicles
  * CARHUB main hub for History/Costs/Videos
  * History view for list of reports
  * Costs view for list of Cost Estimates
  * Videos view for tutorials on car maintenance
  
## Sitemap
  ### Splash Screen
  When app loads and app title is displayed
   - CARCRUX -> Login/SignUp
  ### Login/SignUp
  User will be asked to login or signup
   - Login -> Garage
   - SignUp -> Sign-Up Form -> Garage
  ### Garage
  User can add, edit, or delete a vehicle
   - addButton -> vehicleDataForm -> CARHUB
  
  Garage when vehicle has been added
   - vehicleData -> verticalEllipsis -> edit/delete
   - edit -> vehicleDataForm
   - delete -> (Updated)GARAGE
  ### Carhub
  User can view history, costs, or videos
   - history -> historyView
   - costs -> costsView
   - videos -> videoView
## Interface
  ### Information Architecture
   ### Splash Screen
   - CARCRUX -> Login/SignUp
   ### Login/SignUp
   - Login -> Garage
   - SignUp -> Sign-Up Form: Email & Password -> Garage
   ### Garage
   - addButton -> vehicleDataForm: Make, Model, Year, Style, Color/Trim, Nickname(optional)-> CARHUB
   - vehicleData -> verticalEllipsis -> edit/delete
   - edit -> vehicleDataForm: Make, Model, Year, Style, Color/Trim, Nickname(optional)-> CARHUB  
   - delete -> (Updated)GARAGE
   ### Carhub
   <- (back button) Inputted Nickname at the top 
   - Hub(highlighted current view) 
   - Oil Change (Add Record) -> Form: approx Date & Mileage (Add) -> CARHUB
   - Tire Rotation (Add Record) -> Form: approx Date & Mileage (Add) -> CARHUB   
   Bottom Navigation
      - history -> historyView -> Add Record -> Form: Serviced Category, Date, Mileage (Add)-> historyView
      - costs -> costsView -> Cost and Labor diagram of estimates <-(back button) -> Hub
      - videos -> videoView -> List of tutorial Videos <-(back button) -> Hub
   (coming soon) - find shop 
  ### Browser Support
 
  Currently, App will be subjected to portrait mode for Android and IOS. Browser support will be added in later versions.
 
 ## Infrastructure
 
   ### Technical Requirements
   - AsyncStorage for storing vehicle data locally
   - Local Web Server
   - [Expo](https://docs.expo.io/versions/latest/distribution/building-standalone-apps)
   
   ### Programming Languages
   - [React Native](https://facebook.github.io/react-native/docs/getting-started)
   - [CSS/SASS](https://sass-lang.com/)
   
   ### Integrations
   - [Edmunds API](https://github.com/EdmundsAPI/sdk-javascript)
   
   ### Deployment Workflow
   
   First, will be developed in feature branches and then merged to dev/master branches. App will be deployed through the [Google Play Store](https://developer.android.com/distribute/console/) using [Android APK](https://facebook.github.io/react-native/docs/removing-default-permissions). This app will be tested locally for the Android version. Later will be deployed for IOS devices.
