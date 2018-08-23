import React from "react";
import { Component } from "react";
import { createStackNavigator } from "react-navigation";

import { LoginScreen } from "./screen/LoginScreen";
import { RegisterScreen } from "./screen/RegisterScreen";

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: "Login",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#2F4E78",
      },
      headerTitleStyle: {
        color: "#FFFFFF",
      },
    },
  }
);

export default class App extends Component<{}> {
  public render() {
    return (
      <RootStack />
    );
  }
}
