import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from "expo-font";
import db from "../config"

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class BankITScreen1 extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      activitiesList: [],
      approveFlag: false,
      code: '',
      cleanflag: false,
      washFlag: false,
      babySittingFlag: false,
      otherFlag: false,
      otherActivity: '',
      isOnCleanToggleSwitch: false,
      isOnWashToggleSwitch: false,
      isOnBabyToggleSwitch: false,
      isOnOthersToggleSwitch: false,
      isClean: false,
      isWash: false,
      isBabysitting: false,
      isOthers: false,
      noOfActivities: 0,
      others: '',
      amountFromDB: 0,
      approveEnabled: true,
      activitiesListDB: [],
      activityUpdated: false,
      secretCodeFlag: true,
    };
  }

  async loadFonts() {
    await Font.loadAsync(customFonts);
    this.setState({ fontLoaded: true });
   }

  componentDidMount() {
    this.createList();
    this.loadFonts();
  }

  createList = async() => {
    var activitiesListDB;
    var info = null;
    await db.ref('Users/User1').on('value', (data) => {
        info = data.val();
    });

    if(info.secretCode === 0){
      this.setState({ secretCodeFlag: false },function(){
      console.log(this.state.secretCodeFlag);
      });
    }
    else{
      this.setState({activityUpdated: info.activityUpdated}, function(){
        console.log(this.state.activityUpdated)
       })
   
       this.setState({ noOfActivities: info.noOfActivities }, function () {
         console.log(this.state.noOfActivities);
       });
   
       this.setState({ activitiesListDB: info.activity }, function () {
         console.log(this.state.activitiesListDB);
       }); 
    }
 

    activitiesListDB = this.state.activitiesListDB;

    var activitiesList = [];
    for (var i in activitiesListDB) {
      activitiesList.push(activitiesListDB[i]);
      if (activitiesListDB[i] === 'clean') {
        this.setState({ cleanFlag: true });
      } else if (activitiesListDB[i] === 'wash') {
        this.setState({ washFlag: true });
      } else if (activitiesListDB[i] === 'baby') {
        this.setState({ babySittingFlag: true });
      } else {
        this.setState({ otherFlag: true });
        this.setState({ otherActivity: activitiesListDB[i] });
      }
    }
    this.setState({ activitiesList: activitiesList });

    this.setState({ amountFromDB: info.Total, approveEnabled: true }, function(){
      console.log(this.state.amountFromDB)
    });
  };


toggleSwitch(label) {
    if (label === 'clean') {
      this.setState({ isClean: !this.state.isClean });
    } else if (label === 'wash') {
      this.setState({ isWash: !this.state.isWash });
    } else if (label === 'baby') {
      this.setState({ isBabysitting: !this.state.isBabysitting });
    } else {
      this.setState({ isOthers: !this.state.isOthers });
    }
  }

tempCheckActivities = () => {
    var tempChoice = [];
    tempChoice.push({ chore: 'Clean', value: this.state.isClean });
    tempChoice.push({ chore: 'Wash', value: this.state.isWash });
    tempChoice.push({ chore: 'Baby Sitting', value: this.state.isBabysitting });
    tempChoice.push({ chore: this.state.others, value: this.state.isOthers });
    console.log('tempchoice:' + tempChoice);
    
    var activitySelected = [];
    var count = 0;
    tempChoice.map((item, index) => {
      if (item.value === true) {
        count += 1;
      }
    })

    if(count === 0){
      alert("Select activity to Approve");
    }
    else{
      this.setState({
        noOfActivities: count,
        approveFlag: true
      }, function(){
        console.log(this.state.noOfActivities)
      })
    }
    
  };

  tempSubmit = async() => {
    if (!this.state.code.trim()) {
      alert('Please Enter Code');
      return;
    }
    var secretCode = 0;
      db.ref('Users/User1/secretCode').on('value', (data) => {
        secretCode = data.val();
      });
    if (parseInt(this.state.code) === secretCode) {
      var temp = 0;
      var amount = this.state.noOfActivities * 10 + this.state.amountFromDB;
      var ref = await db.ref('Users/User1');
      await ref.update({
        Total: amount,
      });

      this.reset();

    } else {
      alert('Code Incorrect');
    }
  }

  reset = () =>{
    this.setState({ approveFlag: false });
    this.setState({ noOfActivities: 0 });
    this.setState({ activitiesList: [] });
      this.setState({ cleanFlag: false });
      this.setState({ washFlag: false });
      this.setState({ babySittingFlag: false });
      this.setState({ otherFlag: false });
      this.setState({ activityUpdated: false });
      var activityRef = db.ref('Users/User1');
      activityRef.update({
        activity: '',
      });
      db.ref('Users/User1').update({
        activityUpdated: false,
        noOfActivities: 0,
      });
      this.setState({ noOfActivities: 0 });
  }

  render() {
    const { fontLoaded } = this.state;
    const cleanFlag = this.state.cleanFlag;
    const washFlag = this.state.washFlag;
    const babySittingFlag = this.state.babySittingFlag;
    const otherFlag = this.state.otherFlag;
    const approveFlag = this.state.approveFlag;
    const secretCodeFlag = this.state.secretCodeFlag;

    if (fontLoaded) {
    if(secretCodeFlag === false){
      return(
        <View>
            <Text> Please set the secret code in Parent Profile screen to approve the activities </Text>
        </View>
      )
    }
    else if (this.state.activityUpdated) {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <ImageBackground style = {{flex: 1, top: 180, width: 250, left: -30}}
            resizeMode= 'contain'
            blurRadius={1}
            source = {require("../assets/tree.png")}>
          <View style={[styles.appIcon],{justifyContent: "center",left: 180,top:-150}}>
              <Image
                source={require("../assets/pp.png")}
                style={styles.iconImage}
              ></Image>
            </View>
                
                
          {cleanFlag ? (
            <View style={{ top: -90,left: 80,flexDirection: 'row', marginTop: 10 }}>
            <Switch
              style={{ transform: [{ scaleX: 1}, { scaleY: 1}], marginLeft: 5, marginRight: 5 }}
              trackColor={{
                false: 'grey',
                true: this.state.isClean ? 'cyan' : 'grey',
              }}
              thumbColor={this.state.isClean ? '#ee8249' : 'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => this.toggleSwitch('clean')}
              value={this.state.isClean}
            />
            <Text
              style={styles.appTitleText}>
              Cleaning
            </Text>
            
          </View>
          ) : undefined}

          {washFlag ? (
            <View style={{ top: -90,left: 80,flexDirection: 'row', marginTop: 10  }}>
            <Switch
              style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }], marginLeft: 5 , marginRight: 5}}
              trackColor={{
                false: 'grey',
                true: this.state.isWash ? 'cyan' : 'grey',
              }}
              thumbColor={this.state.isWash ? '#ee8249' : 'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => this.toggleSwitch('wash')}
              value={this.state.isWash}
            />
            <Text
              style={styles.appTitleText}>
              Washing
            </Text>
            
          </View>
          ) : undefined}

          {babySittingFlag ? (
            <View style={{ top: -90,left: 80,flexDirection: 'row' , marginTop: 10 }}>
            <Switch
              style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] , marginLeft: 5, marginRight: 5}}
              trackColor={{
                false: 'grey',
                true: this.state.isBabysitting ? 'cyan' : 'grey',
              }}
              thumbColor={this.state.isBabysitting ? '#ee8249' : 'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => this.toggleSwitch('baby')}
              value={this.state.isBabysitting}
            />
            <Text
              style={styles.appTitleText}>
              Baby Sitting
            </Text>
            
          </View>
          ) : undefined}

          {otherFlag ? (
            <View style={{ top: -90,left: 80,flexDirection: 'row', marginTop: 10  }}>
            <Switch
              style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }], marginLeft: 5, marginRight: 5 }}
              trackColor={{
                false: 'grey',
                true: this.state.isOthers ? 'cyan' : 'grey',
              }}
              thumbColor={this.state.isOthers ? '#ee8249' : 'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => this.toggleSwitch('others')}
              value={this.state.isOthers}
            />
            <Text
              style={styles.appTitleText}>{this.state.otherActivity}
            </Text>
            
            
          </View>
          ) : undefined}

          
          <TouchableOpacity
            style={styles.buttonApprove}
            disabled={!this.state.approveEnabled}
            onPress={() => {
              this.tempCheckActivities();
              //this.approve();
            }}>
            <Text style={{ color: "white",fontFamily: "Bubblegum-Sans",alignItems: "center" }}> Approve </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonApprove}
            disabled={!this.state.approveEnabled}
            onPress={() => {
              this.reset();
            }}>
            <Text style={{ color: "white",fontFamily: "Bubblegum-Sans",alignItems: "center" }}> Don't Approve </Text>
          </TouchableOpacity>
          

          {approveFlag ? (
            <View style={{ left: 50,alignItems: 'center'}}>
              
              <TextInput
                style={{ backgroundColor: 'grey', borderRadius: 20, borderWidth:1, borderColor:"cyan", marginTop: -10,height: 30, top: -50, width: 150, right: -60, textAlign: "center" }}
                secureTextEntry={true}
                placeholder="Secret Code"
                value={this.state.code}
                onChangeText={(text) => {
                  this.setState({ code: text });
                }}
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => this.tempSubmit()}>
                <Text> Submit </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text> </Text>
          )}
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <SafeAreaView style={styles.droidSafeArea} />
          <Text> No Activities to approve </Text>
        </View>
      );
    }
  }
  else{
    return null
}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15192d',
  },
  text: {
    color: 'black',
    textAlign: 'center',
  },
 
  list: {
    alignItems: 'center',
    marginTop: 10,
  },
  buttonApprove: {
    borderRadius: 20,
    borderWidth: 2,
    width: 120,
    height: 20,
    alignItems: 'center',
    left: 100,
    top: -70,
    marginBottom: 10,
    borderColor: "#ED7A7D",
    backgroundColor: "grey"
  },
  submitButton: {
    borderRadius: 20,
    borderWidth: 2,
    width: 100,
    height: 30,
    alignItems: 'center',
    left: 60,
    top: -70,
    marginTop: 30,
    borderColor: "#ED7A7D",
    backgroundColor: "grey"
  },
  inputBox: {
    marginTop: 5,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  toggleView: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 100,
  },
  
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  iconImage: {
    marginTop: RFValue(-30),
    width:RFValue(90),
    height:RFValue(90),
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(15),
    fontFamily: "Bubblegum-Sans",
    
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
});
