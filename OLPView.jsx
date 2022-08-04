import React, { Component } from "react";
import { WebView } from 'react-native-webview';

import * as ScreenOrientation from 'expo-screen-orientation';

import FloatingCloseButton from './components/FloatingCloseButton';
import ContainerView from './components/ContainerView.jsx';
import { Platform } from "react-native";

export default class OLPView extends Component {

  constructor(props) {
    super(props);
    this.state = {playerOpen: false};
    console.log("OLPView Open")
  }

  isPlayerOpen = 
    `const isPlayerOpen = function(mutationList, observer) {
      let iFrames = document.getElementsByTagName("iframe");
      if (iFrames.length > 0 && iFrames[0].getAttribute("data-test") != "CompanyNoticeDetailsDocument") {
        window.ReactNativeWebView.postMessage('{"playerStatus": "open"}');
        toggleNavbar(false);
      } else {
        window.ReactNativeWebView.postMessage('{"playerStatus": "closed"}');
        toggleNavbar(true);
      }
    }
    const playerObserver = new MutationObserver(isPlayerOpen);
    playerObserver.observe(document, {childList: true, subtree: true});
    true;`

  //Android Webview doesn't like PDFs
  redirectAndroidPDF = 
    `const redirectAndroidPDF = function(mutationList, observer) {
      let iFrames = document.getElementsByTagName("iframe");
      if (iFrames.length > 0 && iFrames[0].getAttribute("data-test") == "CompanyNoticeDetailsDocument") {
        let pdfFrame = iFrames[0];
        pdfFrame.src = "https://docs.google.com/gview?embedded=true&url=" + encodeURIComponent(pdfFrame.src);
      }
    }
    const pdfObserver = new MutationObserver(redirectAndroidPDF);
    pdfObserver.observe(document, {childList: true, subtree: true});
    true;`

  defineClosePlayer = 
    `function closePlayer() {
      let iFrames = document.getElementsByTagName("iframe");
      if (iFrames.length > 0) {
        let playerFrame = iFrames[0];
        playerFrame.parentNode.removeChild(playerFrame);
      }
    }
    true;`

  closePlayer =
    `closePlayer();
    true;`

  //Let it be known that OLP is supposed to hide these without my help
  defineToggleNavbar = 
    `function toggleNavbar(visible) {
      let navbar = document.querySelector("[data-test='SidebarNavigation']");
      let oldNavbar = document.getElementById("sidenav-ocean");
      let desktopNavbar = document.querySelector("[data-test='Sidebar']");

      if (navbar) {
        navbar.parentElement.style.visibility = visible? "visible" : "collapse";
        navbar.parentElement.style.height = visible? "60px" : "0px";
      }
      if (oldNavbar) {
        oldNavbar.style.visibility = "collapse";
      }
      if (desktopNavbar) {
        desktopNavbar.parentElement.parentElement.style.visibility = visible? "visible" : "collapse";
        desktopNavbar.parentElement.parentElement.style.width  = visible? "auto" : "0px";
      }
    }
    true;`

  hideStaLinks = 
    `let element = document.createElement("style");
    document.head.appendChild(element);
    let sheet = element.sheet;

    let moreButtonStyle = "[data-test='SidebarNavigationMoreButton'] {display: none}";
    let personalCardLinkStyle = "[data-test='PersonalCardLink'] {display: none}";
    let sidebarMenuStyle = "[data-test='SidebarLegacyMenuSection'] {display: none}";
    let sidebarMenuLabelStyle = "[data-test='SidebarLegacyMenuMoreLabel'] {display: none}";
    let sidebarMenuIconStyle = "[data-test='SidebarLegacyMenuIcon'] {display: none}";

    sheet.insertRule(moreButtonStyle, 0);
    sheet.insertRule(personalCardLinkStyle, 1);
    sheet.insertRule(sidebarMenuStyle, 2);
    sheet.insertRule(sidebarMenuLabelStyle, 3);
    sheet.insertRule(sidebarMenuIconStyle, 4);

    true;`

  //Because logging out from the new profile doesn't call any loading for whatever reason
  replaceLogoutPage = 
    `const replaceLogoutPage = function(mutationList, observer) {
      if (window.location.href.includes("auth/login")) {
        window.ReactNativeWebView.postMessage('{"requestedAction": "logout"}');
      }
    }
    const logoutPageObserver = new MutationObserver(replaceLogoutPage);
    logoutPageObserver.observe(document, {attributes: true, childList: true, subtree: true});
    true;`

  hideDownloadButton = 
    `const hideDownloadButton = function(mutationList, observer) {
      let downloadButton = document.querySelector("[data-test='ElearningDetailsHeaderDownloadButton']");
      if (downloadButton) {
        downloadButton.parentElement.style.visibility = "collapse";
      }
    }
    const downloadObserver = new MutationObserver(hideDownloadButton);
    downloadObserver.observe(document, {childList: true, subtree: true});
    true;`

  hideAppFunctionality = 
    `const hideAppFunctionality = function(mutationList, observer) {
      let appFunctionalityTitle = document.querySelector("[data-test='ProfileAppFunctionalityTitle']");
      if (appFunctionalityTitle) {
        appFunctionalityTitle.parentElement.parentElement.parentElement.parentElement.parentElement.style.visibility = "collapse";
        appFunctionalityTitle.parentElement.parentElement.parentElement.parentElement.parentElement.style.paddingTop = "0px";
      }
    }
    const functionalityObserver = new MutationObserver(hideAppFunctionality);
    functionalityObserver.observe(document, {childList: true, subtree: true});
    true;`

  componentWillUnmount() {
    //TODO - cancel messages?
  }

	render() {
		return (
      <ContainerView>
        <WebView
          ref={(r) => (this.webView = r)}
          source={{ uri: `${this.props.sessionData.baseURL}OLP/home` }}
          style={{height: '100%', width: '100%', backgroundColor: "#023650"}}
          userAgent="SgApp/1+OceanLearningApp"
          injectedJavaScriptBeforeContentLoaded={`(function() {
            window.sessionStorage.setItem("USER_LOGIN_PARAMS", JSON.stringify(${this.props.sessionData.USER_LOGIN_PARAMS}));
            window.sessionStorage.setItem("SESSION_TOKEN", ${this.props.sessionData.SESSION_TOKEN});
            window.sessionStorage.setItem("USER_ACCOUNT_INFO", JSON.stringify(${this.props.sessionData.USER_ACCOUNT_INFO}));
            window.sessionStorage.setItem("ENVIRONMENT_CONFIGURATION", JSON.stringify(${this.props.sessionData.ENVIRONMENT_CONFIGURATION}));
            })();`}
          onLoad={(syntheticEvent) => {
            this.webView.injectJavaScript(this.defineToggleNavbar);
            this.webView.injectJavaScript(this.isPlayerOpen);
            this.webView.injectJavaScript(this.defineClosePlayer);
            this.webView.injectJavaScript(this.hideStaLinks);
            //this.webView.injectJavaScript(this.hideDownloadButton);
            this.webView.injectJavaScript(this.hideAppFunctionality);
            this.webView.injectJavaScript(this.replaceLogoutPage);
            if (Platform.OS === 'android') {
              this.webView.injectJavaScript(this.redirectAndroidPDF);
            }
          }}
          onNavigationStateChange={(newNavState) => {
            if (newNavState.url.includes("PersonnelScreenView")) {
              const newURL = `/OLP/profile`;
              const redirectTo = 'window.location = "' + newURL + '"';
              this.webView.injectJavaScript(redirectTo);
            }
          }}
          onMessage={(event) => {
            const message = JSON.parse(event.nativeEvent.data);
            
            if (message.playerStatus == "open") {
              //Only call functions when it changes
              if (!this.state.playerOpen) {
                ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
                this.setState({playerOpen: true});
              }
            } 
            if (message.playerStatus == "closed") {
              //Only call functions when it changes
              if (this.state.playerOpen) {
                ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
                this.setState({playerOpen: false});
              }
            }

            if (message.requestedAction == "logout") {
              this.props.logOut();
            }
          }}
        />
       {this.state.playerOpen && <FloatingCloseButton onPress={() => this.webView.injectJavaScript(this.closePlayer)}/>}
      </ContainerView>
		);
	}
}