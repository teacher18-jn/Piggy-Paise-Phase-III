import React, {Component} from "react";
import {Text, View, StatusBar, Platform, SafeAreaView, StyleSheet} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import * as Font from "expo-font";


let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
  };

export default class Logout extends Component{
    constructor() {
        super();
        this.state = {
          fontLoaded: false
        };
      }
    
      async loadFonts() {
       await Font.loadAsync(customFonts);
       this.setState({ fontLoaded: true });
      }
    
      componentDidMount() {
        this.loadFonts();
      }
    
    render(){
        const { fontLoaded } = this.state;
    if (fontLoaded) {
        return(
            <View
                style = {{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <SafeAreaView style = {styles.droidSafeArea}/>
               
                <Text style={{fontFamily: "Bubblegum-Sans"}}>Logout</Text>

            </View>
        )
    }
    else{
        return null;
    }
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  cardContainer: {
    flex: 0.85
  },
  noStories: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center"
  },
});
