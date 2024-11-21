/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { NavigationContainer } from "@react-navigation/native";
import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import CodePush from "react-native-code-push";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Host } from "react-native-portalize";
import { Provider } from "react-redux";
import "../locale";
import AppStack from "../routes/AppStackRoutes";
import { store } from "../store/configureStore";
import MainContainer from "./MainContainer";
import { navigationRef } from "./rootNavigation";
import appsFlyer from "react-native-appsflyer";
import {
  initializeSslPinning,
  addSslPinningErrorListener,
} from "react-native-ssl-public-key-pinning";

let codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME };

// setJSExceptionHandler((error, isFatal) => {
//   crashlyticsRecordError(error);
// });

if (!__DEV__) {
  console.log = () => {}; //comment to see console in production
}

appsFlyer.initSdk(
  {
    devKey: "nFtUX4F7arAYJMNwykeEAn",
    isDebug: true, // set to true if you want to see data in the logs
    appId: "6464039149", // iOS app id
    onInstallConversionDataListener: true,
    timeToWaitForATTUserAuthorization: 10,
    onDeepLinkListener: true,
  },
  (result) => {
    console.log({ appsFlyer_result: result });
  },
  (error) => {
    console.error({ appsFlyer_error: error });
  }
);

function App() {
  const routeNameRef = useRef();
  const [showTopBar, setShowTopBar] = useState(true);

  // start ssl pinning
  useEffect(() => {
    const setupSslPinning = async () => {
        try {
          await initializeSslPinning({
            "one.cenomi.com": {
              includeSubdomains: true,
              publicKeyHashes: [
                "O2+dBxfqr2n+USFOBgJp5lY8EYeHVsnGu0O+76ZqZEQ=", // New pin hash
              ],
            },
          });
          console.log("SSL pinning initialized successfully");
        } catch (error) {
          console.error("Failed to initialize SSL pinning", error);
        }
      };

    setupSslPinning();

    const callApi = async () => {
      try {
        const response = await fetch("https://one.cenomi.com");

        console.log("Network request succeeded", response);
      } catch (error) {
        console.log("Network request failed 1", error);
      }
    };

    callApi();
  }, []);

  useEffect(() => {
    const subscription = addSslPinningErrorListener((error) => {
      console.log("SSL Pinning Error:", error.serverHostname);
      console.log(error.message);
    });

    return () => subscription.remove();
  }, []);
  // end ssl pinning

  const getActiveRouteName = (state) => {
    const route = state?.routes[state.index];
    if (route.state) {
      return getActiveRouteName(route.state);
    }
    return route.name;
  };

  useEffect(() => {
    const state = navigationRef.current.getRootState();
    if (state !== undefined) {
      routeNameRef.current = getActiveRouteName(state);
    }
  }, []);

  const onStateChangeHandle = useCallback((state) => {
    const currentRouteName = getActiveRouteName(state);
    const { params } = state.routes[state.index];
    if (params && params.hideTopBar) {
      setShowTopBar(false);
    } else {
      setShowTopBar(true);
    }
    routeNameRef.current = currentRouteName;

    // if (currentRouteName !== NavigationRouteNames.LOGIN_HOME) {
    //   console.log('called 1');
    //   getSaveData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN).then((data) => {
    //     console.log('called 2', data);
    //     if (!data) {
    //       navigationRef?.current?.navigate(NavigationRouteNames.LOGIN_HOME as never);
    //     }
    //   });
    // }
  }, []);

  return (
    <GestureHandlerRootView style={styles.mainContainer}>
      <Provider store={store}>
        <NavigationContainer
          ref={navigationRef}
          onStateChange={onStateChangeHandle}
        >
          <Host>
            <MainContainer>
              <AppStack />
            </MainContainer>
          </Host>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 0,
  },
});

class ComponentApp extends Component<{}> {
  constructor() {
    super();
    this.state = { restartAllowed: true };
  }

  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log({ syncMessage: "Checking for update." });
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log({ syncMessage: "Downloading package." });
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        console.log({ syncMessage: "Awaiting user action." });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        console.log({ syncMessage: "Installing update." });
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        console.log({ syncMessage: "App up to date.", progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        console.log({
          syncMessage: "Update cancelled by user.",
          progress: false,
        });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        console.log({
          syncMessage: "Update installed and will be applied on restart.",
          progress: false,
        });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        console.log({
          syncMessage: "An unknown error occurred.",
          progress: false,
        });
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    this.setState({ progress });
  }

  toggleAllowRestart() {
    if (this.state.restartAllowed) {
      CodePush.disallowRestart();
    } else {
      CodePush.allowRestart();
    }

    this.setState({ restartAllowed: !this.state.restartAllowed });
  }

  getUpdateMetadata() {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING).then(
      (metadata: LocalPackage) => {
        this.setState({
          syncMessage: metadata
            ? JSON.stringify(metadata)
            : "Running binary version",
          progress: false,
        });
      },
      (error: any) => {
        this.setState({ syncMessage: "Error: " + error, progress: false });
      }
    );
  }

  /** Update is downloaded silently, and applied on restart (recommended) */
  sync() {
    CodePush.sync(
      {},
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
  }

  /** Update pops a confirmation dialog, and then immediately reboots the app */
  syncImmediate() {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.ON_NEXT_SUSPEND,
        mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
      },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
  }

  render() {
    return <App />;
  }
}

export default CodePush(codePushOptions)(ComponentApp);
