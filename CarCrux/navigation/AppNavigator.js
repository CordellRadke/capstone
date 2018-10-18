import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AppLogin from './AppLogin';
import Garage from './Garage';
import AppSignUp from './AppSignUp'
import VehicleForm from './VehicleForm';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth: AppLogin,
  AddVehicle: Garage,
  ViewVehicleForm: VehicleForm,
  Main: MainTabNavigator,
  
});