import React from "react";
import { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { Provider } from "react-redux";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import store from "./store";

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Home: HomeScreen,
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
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
