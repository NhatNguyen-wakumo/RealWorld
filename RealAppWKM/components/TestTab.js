import React, { Component } from 'react';
import { Text, View, Button, TextInput, Platform, AppRegistry, StyleSheet, } from 'react-native';
import firebase from 'react-native-firebase';

export default class TestTab extends Component {
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

    onRegister=()=>{
        firebase.auth().createUserWithEmailAndPassword(
            this.state.typedEmail, this.state.typedPassword)
            .then((loggedInUser)=>{
                this.setState({user: loggedInUser})
                console.log(`Register with user: ${JSON.stringify(loggedInUser.toJSON())}`)
            })
            .catch((error) => {
                console.log(`Register fail`)
            })
    }

    render(){
        return(
            <View style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: Platform.OS === 'ios' ? 1 : 1
            }}>
                <Text style={{
                    textAlign: 'center'
                }}>Login</Text>
                <TextInput style={{
                    height: 48,
                    width: 200,
                    margin: 10,
                    padding: 10,
                    
                }}
                keyboardType="email-address"
                placeholder="email"
                autoCapitalize="none"
                onChangeText={
                    (text) => this.setState({
                        typedEmail: text
                    })
                }
                >
                </TextInput>
                <TextInput style={{
                    height: 48,
                    width: 200,
                    margin: 10,
                    padding: 10,
                    
                }}
                keyboardType="default"
                placeholder="password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={
                    (text) => this.setState({
                        typedPassword: text
                    })
                }
                >
                </TextInput>
                <Button onPress={this.onLogin}
                title="Login">
                </Button>
                <Button onPress={this.onRegister}
                title="Register">
                </Button>
            </View>
        )
    }
}