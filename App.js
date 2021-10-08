import "react-native-gesture-handler";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BubblegumSans_400Regular} from "@expo-google-fonts/bubblegum-sans";
import * as Font from "expo-font";

import DrawerNavigator from "./navigation/DrawerNavigator";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }

  async loadFonts() {
    await Font.loadAsync({
      BubblegumSans_400Regular: BubblegumSans_400Regular,
     // Rajdhani_600SemiBold: Rajdhani_600SemiBold
    });
    this.setState({ fontLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    const { fontLoaded } = this.state;
    if (fontLoaded) {
      return (
        <NavigationContainer>
          <DrawerNavigator/>
        </NavigationContainer>
      )
    }
    return null;
  }
}
