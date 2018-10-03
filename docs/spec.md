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
        * [Deployment Workflow](#development-workflow)
        * [Web Host](#web-host)

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
  
