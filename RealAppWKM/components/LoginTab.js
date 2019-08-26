import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Platform, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from 'react-native-firebase';

export default class LoginTab extends Component {
  
  constructor(props){
    super(props);
    this.unsubcriber = null;
    this.state={
        typedEmail: '',
        typedPassword: '',
        user: null
    }
    this.iosConfig={
      clientId:'377234939500-bea9c5sovr8b5poqi471f2i1s22u3dhl.apps.googleusercontent.com',
      appId:'1:377234939500:ios:8212c3f2fc453646',
      apiKey:'AIzaSyDqlgP9SJSrR83fuehoL51oMd9YRPbJI-8',
      databaseURL:'https://realappwkm.firebaseio.com',
      storageBucket:'realappwkm.appspot.com',
      messagingSenderId:'377234939500',
      projectId:'realappwkm',
      persistance:true
  };
  this.androidConfig={
    persistance:true
  };
  this.userApp = firebase.initializeApp(
      Platform.OS === 'ios' ? this.iosConfig : this.androiConfig
  )
  }

  onLogin = () => {
      firebase.auth().signInWithEmailAndPassword(
        this.setState.typedEmail,
        this.setState.typedPassword
      ).then(loggedInUser => {
        this.props.navigation.navigate("Account");
        console.log(
          `Register with user: ${JSON.stringify(loggedInUser.toJSON)}`
        );
      }).catch(error => {
        alert("Register fail")
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerUp}>
          <Text style={styles.title}>Login with Firebase</Text>
        </View>
        <View style={styles.containerMid}>
          <TextInput
            style={styles.inputs}
            keyboardType="email-address"
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={text => {
              this.setState({
                typedEmail: text
              });
            }}
            value={this.state.typedEmail}
          ></TextInput>
          <TextInput
            style={styles.inputs}
            keyboardType="default"
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={text => {
              this.setState({
                typedPassword: text
              });
            }}
            value={this.state.typedPassword}
          ></TextInput>
        </View>
        <View style={styles.containerDown}>
          <View style={styles.btn}>
            <Button style={styles.btnLogin}
            onPress={this.onLogin}
            title="Login">
            </Button>
          </View>
          <View style={styles.btn}>
            <Button
              style={styles.btnSignup}
              onPress={() => this.props.navigation.navigate("Signup")}
              title="Sign up">
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerUp: {
    flex: 1
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    marginTop: 20,
    textAlign: "center"
  },
  containerMid: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    marginTop: -100
  },
  inputs: {
    height: 40,
    width: 250,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#fafafa",
    borderWidth: 1,
    marginTop: 10
  },
  containerDown: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -100
  },
  btnText: {
    fontSize: 15,
    backgroundColor: "#3897f1",
    height: 20,
    width: 70,
    marginRight: 40,
    marginLeft: 40,
    textAlign: "center",
    color: "white"
  }
});