import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";;
import BottomTabNavigator from "./BottomTabNavigator";
import Profile from "../screens/Profile";
import ParentProfile from "../screens/ParentProfile";
import Logout from "../screens/Logout";
import Goals from "../screens/Goals";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component{
  render(){
    return(
        <Drawer.Navigator>
          <Drawer.Screen name = "Home" component ={BottomTabNavigator}/>
          <Drawer.Screen name = "Goals" component = {Goals}/>
          <Drawer.Screen name = "Profile" component = {Profile}/>
          <Drawer.Screen name = "Parent Profile" component = {ParentProfile}/>
          <Drawer.Screen name = "Logout" component = {Logout}/>
        </Drawer.Navigator>
    )
  }
}

