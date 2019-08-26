import React, { Component } from "react";
import { StyleSheet, Text, View, Platform, AppRegistry, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import firebase from 'react-native-firebase';
import { TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';

export default class SignupTab extends Component {
  constructor(props) {
    super(props);
    this.unsubcriber=null;
    this.state = {
      users: [],
      newUserName: "",
      newUserAge: "",
      newUserGender: "",
      newUserEmail: "",
      newUserPassword: "",
      loading: false,
      typedEmail: "",
      typedPassword: "",
      user: null
    };
    console.log(firebase.auth());
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
      Platform.OS === 'ios' ? this.iosConfig : this.androidConfig
    );

    this.rootRef = firebase.database().ref();
    console.log(this.rootRef);

    this.userRef = this.rootRef.child('user');
    console.log(this.userRef);
  }

  onPressAdd = () => {
    if (this.state.newUserName.trim() === "") {
      alert("User name is blank");
    } else if (this.state.newUserGender.trim() === "") {
      alert("User gender is blank");
    } else if (this.state.newUserAge.trim() === "") {
      alert("User age is blank");
    } else if (this.state.newUserEmail.trim() === "") {
      alert("User email is blank");
    } else if (this.state.newUserPassword.trim() === "") {
      alert("User password is blank");
    } else {
      firebase.auth().createUserWithEmailAndPassword(
        this.state.typedEmail,
        this.state.typedPassword
      ).then((loggedInUser) => {
        this.setState({user:loggedInUser});
        console.log(
          `Register with user: ${JSON.stringify(loggedInUser.toJSON())}`
        );
      })
      .catch((error) => {
        console.log("Register fail");
      })
      this.userRef.push({
        userName: this.state.newUserName,
        userGender: this.state.newUserGender,
        userAge: this.state.newUserAge,
        userEmail: this.state.newUserEmail,
        userPassword: this.state.newUserPassword
      })
      
      this.props.navigation.navigate("Login");
    }
  };

  render() {
    return (
     
      <View style={styles.container}>
        <View style={styles.containerUp}>
          <Text style={styles.title}>Quick Sign Up</Text>
        </View>
        <View style={styles.containerMid}>
          <View style={styles.subContainerMid}>
            <Text style={styles.inputsText}>Your Name</Text>
            <TextInput
              style={styles.inputs}
              keyboardType="default"
              placeholder="Enter your name"
              autoCapitalize="none"
              onChangeText={text => {
                this.setState({
                  newUserName: text
                });
              }}
              />
          </View>
          <View style={styles.subContainerMid}>
            <Text style={styles.inputsText}>Your Gender</Text>
            <TextInput
              style={styles.inputs}
              keyboardType="default"
              placeholder="Enter your gender"
              autoCapitalize="none"
              onChangeText={text => {
                this.setState({
                  newUserGender: text
                });
              }}
              value={this.state.newUserGender}
            ></TextInput>
          </View>
          <View style={styles.subContainerMid}>
            <Text style={styles.inputsText}>Your Age</Text>
            <TextInput
              style={styles.inputs}
              keyboardType="default"
              placeholder="Enter your age"
              autoCapitalize="none"
              onChangeText={text => {
                this.setState({
                  newUserAge: text
                });
              }}
              value={this.state.newUserAge}
            ></TextInput>
          </View>
          <View style={styles.subContainerMid}>
            <Text style={styles.inputsText}>Your Email</Text>
            <TextInput
              style={styles.inputs}
              keyboardType="email-address"
              placeholder="Enter your email"
              autoCapitalize="none"
              onChangeText={(text) => {
                this.setState({
                  newUserEmail: text,
                  typedEmail: text
                });
              }}
              value={this.state.newUserEmail}
            ></TextInput>
          </View>
          <View style={styles.subContainerMid}>
            <Text style={styles.inputsText}>Your Password</Text>
            <TextInput
              style={styles.inputs}
              keyboardType="default"
              secureTextEntry="true"
              placeholder="Enter your password"
              autoCapitalize="none"
              onChangeText={(text)  => {
                this.setState({
                  newUserPassword: text,
                  typedPassword: text
                });
              }}
              value={this.state.newUserPassword}
            ></TextInput>
          </View>
        </View>
        <View style={styles.containerDown}>
          <Button style={styles.btnSignup}
            onPress={this.onPressAdd}
            title="Sign up"
            // onPress={this.onRegister}
          >
          </Button>
        </View>

        <FlatList>
          data={this.state.users}
          renderItem=
          {({ item, index }) => {
            return <Text style={styles.dataText}>{item.userName}</Text>;
          }}
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: Platform.OS === 'ios' ? 1 : 1
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
    marginTop: 15,
    color: "#3897f1"
  },
  subContainerMid: {
    flexDirection: "column",
    marginLeft: 20,
    marginTop: 40,
    alignItems: "center"
  },
  inputsText: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: -20
  },
  inputs: {
    marginTop: 1,
    borderColor: "black",
    borderWidth: 1,
    width: 250,
    height: 35
  },
  containerDown: {
    alignItems: "center",
    marginTop: 20
  },
  btnSignup: {
    backgroundColor: "#3897f1",
    color: "white",
    fontSize: 15,
    height: 25,
    width: 60,
    textAlign: "center",
    justifyContent: "center"
  },
  dataText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  }
});