import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class LoginTab extends Component {
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
          ></TextInput>
        </View>
        <View style={styles.containerDown}>
          <View style={styles.btn}>
            <TouchableOpacity style={styles.btnLogin}
            onPress={() => this.props.navigation.navigate("Account")}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.btnSignup}
              onPress={() => this.props.navigation.navigate("Signup")}
            >
              <Text style={styles.btnText}>Sign up</Text>
            </TouchableOpacity>
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