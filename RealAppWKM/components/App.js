import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginTab from "./LoginTab";
import SignupTab from "./SignupTab";
import AccountTab from './AccountTab';
import UpdateTab from './UpdateTab';
import FriendTab from './FriendTab';
import ChatTab from './ChatTab';

const AppNavigator = createStackNavigator({
  Login: LoginTab,
  Signup: SignupTab,
  Account: AccountTab,
  Update: UpdateTab,
  Friend: FriendTab,
  Chat: ChatTab
});

const MainNavigator = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});