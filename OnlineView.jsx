import React, { Component } from "react";

import * as SecureStore from "expo-secure-store";

import OLPView from "./OLPView";
import LoginView from "./LoginView";
import LoadingView from "./LoadingView"
import ContainerView from "./components/ContainerView";
import OLPLogin from "./olp/OLPLogin";

export default class OnlineView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sessionData: "",
      isLoggedIn: false,
      isLoading: false,
      displayError: ""
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  autoLogin() {
    Promise.all([
      SecureStore.getItemAsync("company"),
      SecureStore.getItemAsync("username"),
      SecureStore.getItemAsync("password")
    ])
    .then(savedValues => {
        if (savedValues[0] && savedValues[1] && savedValues[2]) {
          this.login(savedValues[0], savedValues[1], savedValues[2]);
        }
    });
  }

  login(company, username, password) {
    this.setState({isLoading: true, displayError: ""});
    OLPLogin(company, username, password)
      .then(({success, sessionData, problem}) => {
        if (success) {
          SecureStore.setItemAsync("company", company);
          SecureStore.setItemAsync("username", username);
          SecureStore.setItemAsync("password", password);
        } else {
          this.handleLoginFailure(problem);
        }
        this.setState(
          {
            isLoggedIn: success,
            isLoading: false,
            sessionData: sessionData
          });
      });
  }

  handleLoginFailure(problem) {
    switch(problem) {
      case "CLIENT_ERROR":
        this.setState({displayError: "Incorrect username or password - please try again"});
        break;
      default:
        this.setState({displayError: "Problem connection to the server - please check your internet connection and try again"});
        break;
    };
    this.logout();
  }

  logout() {
    this.setState({isLoggedIn: false, isLoading: false});
    SecureStore.deleteItemAsync("company");
    SecureStore.deleteItemAsync("username");
    SecureStore.deleteItemAsync("password");
  }

  componentDidMount() {
    this.autoLogin();
  }

  render() {
		return (
      <ContainerView backgroundColor={"#023650"}>
        {this.state.isLoading? 
          <LoadingView/> 
        :
          (this.state.isLoggedIn? 
            <OLPView sessionData={this.state.sessionData} logOut={this.logout}/> 
          : 
            <LoginView login={this.login} displayError={this.state.displayError}/>)}
      </ContainerView>
    );
  }
}