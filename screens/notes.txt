import React, {Component} from "react";
import {Text, View, Dimensions,ImageBackground, Image, StatusBar, Platform, SafeAreaView, StyleSheet} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import * as Font from "expo-font";


let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
  };

export default class BankIT extends Component{
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
            <View style = {styles.container}>
                <SafeAreaView style = {styles.droidSafeArea}/>
                <View style={styles.appIcon}>
              <Image
                source={require("../assets/pp.png")}
                style={styles.iconImage}
              ></Image>
            </View>
                <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }
              >
                Bank IT !
              </Text>
            </View>
                <View style={styles.treeContainer}>
            <Image
              source={require("../assets/tree.png")}
              style={styles.treeImage}
            ></Image>
          </View>

            </View>
        )
    }
    else{
        return null
    }
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15192d",
    //"#232323",
    alignItems: "center"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "#9E9FA3",
    alignItems: "center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  iconImage: {
    marginTop: RFValue(-30),
    width:RFValue(100),
    height:RFValue(100),
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "#56BAC2",
    fontSize: RFValue(20),
    fontFamily: "Bubblegum-Sans",
    marginTop: RFValue(-320),
    //marginLeft: RFValue(-30)
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  cardContainer: {
    flex: 0.85
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
},
treeContainer: {
  flex: 0.3
},
treeImage: {
  width:RFValue(200),
  height:RFValue(300),
  position: "absolute",
  marginLeft: RFValue(-10),
  //width: "10%",
  resizeMode: "contain",
  bottom: RFValue(-15)
}
});
