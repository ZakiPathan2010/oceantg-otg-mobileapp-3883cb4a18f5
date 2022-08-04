import React, { useState, useEffect, useRef } from "react";
import {StyleSheet, View, Text, TextInput, ImageBackground, KeyboardAvoidingView } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

import OceanLogo from './assets/icons/OceanLogo.svg';
import VideotelLogo from './assets/icons/VideotelLogo.svg';
import SeagullLogo from './assets/icons/SeagullLogo.svg';
import CompanyIcon from './assets/icons/CompanyIcon.svg';
import UserIcon from './assets/icons/UserIcon.svg';
import PasswordIcon from './assets/icons/PasswordIcon.svg';

import ContainerView from './components/ContainerView';
import UniversalButton from './components/UniversalButton';

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center"
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%",
    height: "100%"
  },  
  logo: {
    color: "#FFFFFF",
    marginLeft: "5%",
    marginRight: "5%"
  },
  loginContainer: {
    flex: 0,
    alignItems: 'stretch',
    justifyContent: 'center',
    width: "80%",
    height: "45%",
    marginTop: "10%"
  },
  loginText: {
    color: "#FFFFFF",
    textAlign: "center"
  },
  errorText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    backgroundColor: "#E13737"
    //Stripe colour: #D83535
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: "10%",
    marginTop: 10,
    marginBottom: 10
  },
  inputIcon: {
    color: "#000000",
    width: 25,
    height: 25,
    margin: 10
  },
  inputBar: {
    flex: 1,
    flexDirection: 'column'
  },
  input: {
    flex: 1
  },
  loginButton: {
    height: "15%"
  },
  poweredByText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: "20%"
  },
  poweredByContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: "-15%"
  }
});

export default function LoginView ({login, displayError}) {

  [company, setCompany] = useState("");
  [username, setUsername] = useState("");
  [password, setPassword] = useState("");

  const usernameInput = useRef();
  const passwordInput = useRef();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  return (
    <ContainerView flex={0}>
      <ImageBackground style={styles.backgroundImage} source={require("./assets/LoginBackground.jpg")}>
        <KeyboardAvoidingView style={styles.mainContainer}>
          <OceanLogo width={"100%"} height={"10%"} marginTop={"10%"} style={styles.logo}/>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}> 
              Please login to start
            </Text>
            {displayError.trim() != "" && 
            <Text style={styles.errorText}>
              {displayError}
            </Text>}
            <View style={styles.inputContainer}>
              <CompanyIcon style={styles.inputIcon}/>
              <View style={styles.inputBar}>
                <Text style={styles.input}>
                  Company
                </Text>
                <TextInput style={styles.input}
                  placeholder="Company"
                  autoCapitalize="none"
                  onChangeText={(value) => setCompany(value)}
                  returnKeyType="next"
                  onSubmitEditing={() => usernameInput.current.focus()}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <UserIcon style={styles.inputIcon}/>
              <View style={styles.inputBar}>
                <Text style={styles.input}>
                  User
                </Text>
                <TextInput style={styles.input}
                  placeholder="User"
                  onChangeText={(value) => setUsername(value)}
                  autoComplete="username"
                  autoCorrect={false}
                  autoCapitalize="none"
                  textContentType="username"
                  importantForAutofill="yes"
                  ref={usernameInput}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInput.current.focus()}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <PasswordIcon style={styles.inputIcon}/>
              <View style={styles.inputBar}>
                <Text style={styles.input}>
                  Password:
                </Text>
                <TextInput style={styles.input}
                  placeholder="password"
                  secureTextEntry={true}
                  onChangeText={(value) => setPassword(value)}
                  autoComplete="password"
                  autoCorrect={false}
                  autoCapitalize="none"
                  textContentType="password"
                  importantForAutofill="yes"
                  ref={passwordInput}
                />
              </View>
            </View>
            <UniversalButton style={styles.loginButton}
              onPress={() => login(company, username, password)}
              title="Log In"
            />
          </View>
          <Text style={styles.poweredByText}>
            Powered by
          </Text>
          <View style={styles.poweredByContainer}>
            <SeagullLogo width={"20%"} style={styles.logo}/>
            <VideotelLogo width={"20%"} style={styles.logo}/>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </ContainerView>
  );
}