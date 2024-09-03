/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";
import * as DeviceInfo from "react-native-device-info";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { localize } from "../../locale/utils";
import NavigationRouteNames from "../../routes/ScreenNames";
import { Colors, CommonStyles, HEIGHT, Images } from "../../theme";
import {
  LOCAL_STORAGE_DATA_KEY,
  authType,
  externalUserType,
  inputs,
} from "../../utils/constants";
import { getFcmToken } from "../../utils/fcmNotification";
import { storeData } from "../../utils/helpers";
import {
  checkUser,
  doGoogleLogin,
  doLogin,
  getMyProfile,
  getOrganizationInfo,
  registerDevice,
  setIsAutoLogin,
  setIsBiometricOpen,
  setIsLoggedIn,
} from "./redux/actions";
import {
  checkUserDataSelector,
  getMyProfileDetailsSelector,
  getOrganizationDetailsSelector,
  isLoggedInSelector,
  isLoginSuccessSelector,
} from "./redux/selectors";

import { useFormik } from "formik";
import AzureAuth from "react-native-azure-auth";
import * as Yup from "yup";
import {
  Biometric,
  CustomImage,
  CustomText,
  CustomTextInput,
} from "../../components";
import AppPrimaryButton from "../../components/AppPrimaryButton";
import CustomBottomSheet from "../../components/CustomBottomSheet";
import CustomPopupModal from "../../components/CustomPopupModal";
import { BorderRadius } from "../../theme/sizes";
import { EVENT_NAME, trackEvent } from "../../utils/analytics";
import Config from "../../utils/config";
import { RfH, RfW, getColorWithOpacity } from "../../utils/helper";
import { getKnowledgehubTag } from "../KnowledgeHUB/redux/actions";
import { getPublicStaticData, getStaticData } from "../redux/actions";
import {
  getPublicStaticDataSelector,
  isDarkModeSelector,
} from "../redux/selectors";
// import { userList } from './TestUsers';
import CallCenterPopup from "./components/CallCenterPopup";
import NeedHelpPopup from "./components/NeedHelpPopup";
import WrapperContainer from "../../components/WrapperContainer";

const stateSelector = createStructuredSelector({
  isLoginDone: isLoginSuccessSelector,
  myProfileData: getMyProfileDetailsSelector,
  isLoggedIn: isLoggedInSelector,
  isLoginSuccess: isLoginSuccessSelector,
  checkUserData: checkUserDataSelector,
  publicStaticData: getPublicStaticDataSelector,
  isDarkMode: isDarkModeSelector,
  orgainzationDetails: getOrganizationDetailsSelector,
});

const rnBiometrics = new ReactNativeBiometrics();

function LoginHome(): JSX.Element {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {
    isLoginDone,
    myProfileData,
    isLoggedIn,
    isLoginSuccess,
    checkUserData,
    publicStaticData,
    isDarkMode,
    orgainzationDetails,
  } = useSelector(stateSelector);

  const [userInfo, setUserInfo] = useState<{}>({});
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const [accessToken, setaccessToken] = useState();
  const [user, setuser] = useState();

  const [isRememberMe, setIsRememberMe] = useState(true);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [isShowPasswordField, setIsShowPasswordField] = useState(false);
  const [isClickedContinue, setIsClickedContinue] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showMicrosoftMessageForGoogle, setShowMicrosoftMessageForGoogle] =
    useState({
      isVisible: false,
      payload: {},
    });
  const [errorMessageInfo, setErrorMessageInfo] = useState({
    title: "",
    description: "",
    buttonText: "",
    usedFor: "",
  });
  const [openBiometric, setOpenBiometric] = useState(false);
  const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(false);
  const [needHelpOptionVisible, setNeedHelpOptionVisible] = useState(false);
  const [callCenterVisible, setCallCenterVisible] = useState(false);
  const [isVisibleUserList, setIsVisibleUserList] = useState(false);
  const [isLoginWithAzure, setIsLoginWithAzure] = useState(false);
  const [azureInfo, setAzureInfo] = useState({});
  const [isCalledAzureLogout, setIsCalledAzureLogout] = useState(false);

  const darkCard = {
    backgroundColor: isDarkMode
      ? Colors.darkModeButton
      : getColorWithOpacity(Colors.midnightExpress, 0.24),
    borderRadius: BorderRadius.BR15,
  };

  // useEffect(() => {
  //   GoogleSignin.signOut();
  //   setIsCalledAzureLogout(true);
  // }, []);

  // useEffect(() => {
  //   if (isCalledAzureLogout && !isEmpty(azureInfo)) {
  //     setIsCalledAzureLogout(false);
  //     // !isEmpty(azureInfo) && _onLogout(azureInfo);
  //   }
  // }, [isCalledAzureLogout, azureInfo]);

  // New implemented
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(localize("warning.emailCannotEmpty")),
  });
  // @ts-ignore
  const loginFormData = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
  });

  useEffect(() => {
    if (!isEmpty(orgainzationDetails)) {
      setIsLoginWithAzure(false);
      const { externalIntegrations } = orgainzationDetails || {};
      const filteredItem =
        externalIntegrations?.length > 0
          ? externalIntegrations?.find(
              (item) => item?.type === externalUserType?.AZURE_AD
            )
          : {};
      const data = {
        clientId: filteredItem?.config?.clientId,
        tenant: filteredItem?.config?.tenantId,
        // redirectUri: filteredItem?.config?.cloudInstance || ''
        // redirectUri: 'com.cenomi.oca://com.cenomi.oca/ios/callback'
      };

      setAzureInfo(data);

      if (isLoginWithAzure) {
        _onLogin(data);
      }
    }
  }, [orgainzationDetails, isLoginWithAzure]);

  useEffect(() => {
    if (isLoginSuccess) {
      if (!isEmpty(loginFormData.values?.username)) {
        storeData("userInfo", { ...loginFormData.values })
          .then(() => {})
          .catch(() => console.log("Error while saving user credentials..."));
        storeData(
          LOCAL_STORAGE_DATA_KEY.IS_REMEMBER_ME,
          isRememberMe ? true : false
        );
        dispatch(getMyProfile.trigger());

        // FIXME: register FCM on dashboard
        registerFcmToken();

        //STEP 1:  decide whether to biometric required or not
        if (
          isRememberMe &&
          loginFormData.values?.username !== "guest.user@cenomi.com"
        ) {
          console.log("BIOMETRIC - STEP 1 -------------");
          checkBioMetricSenserAvailable();
        } else {
          console.log("BIOMETRIC - STEP 1 - Cancelled -------------");

          navigateToHome();
        }
      }
    }
  }, [isLoginSuccess]);

  const handleFailure = () => {
    Alert.alert(localize("profile.authFailed"), localize("login.authFailed"), [
      {
        text: localize("common.cancel").toLowerCase(),
        style: "cancel",
        onPress: () => {
          console.log(
            "handleFailure - user clicked cancel navigateToHome3 -------------"
          );
          setOpenBiometric(false);

          navigateToHome();
        },
      },
      {
        text: localize("common.tryAgain"),
        onPress: () => {
          console.log("handleFailure - user try again -------------");
          handleEnadleBiometric();
        },
      },
    ]);
  };

  const handleEnadleBiometric = () => {
    rnBiometrics
      .simplePrompt({
        promptMessage: `${localize("biometric.confirmFingerPrint")} 2`,
      })
      .then((resultObject) => {
        const { success } = resultObject;
        console.log("handleEnadleBiometric-1", resultObject);
        if (success) {
          console.log("successful biometrics provided");
          storeData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE, true);
          setOpenBiometric(false);
          console.log("successful biometrics - navigateToHome -------------");

          navigateToHome();
        } else {
          console.log("user cancelled biometric prompt");
          handleFailure();
        }
      })
      .catch(() => {
        console.log(
          "handleEnadleBiometric failed - handleEnadleBiometric catch --> navigateToHome5 -------------"
        );
        console.log("biometrics failed");
        navigateToHome();
      });
  };

  const pleaseEnableBiometric = (
    biometricEnabled: boolean,
    faceIdEnabled: boolean
  ) => {
    console.log("biometricEnabled === ", biometricEnabled);
    console.log("faceIdEnabled === ", faceIdEnabled);

    setOpenBiometric(biometricEnabled);
    if (biometricEnabled) {
      dispatch(setIsBiometricOpen.trigger());

      // set biometric false by defauly in local storage
      storeData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE, false);
    }
    setIsFaceIdEnabled(faceIdEnabled);

    if (!biometricEnabled) {
      console.log("BIOMETRIC not Enabled navigateToHome -------------");
      navigateToHome();
    }
  };

  const checkBioMetricSenserAvailable = () => {
    rnBiometrics.isSensorAvailable().then((resultObject: any) => {
      const { available, biometryType } = resultObject;
      if (available && biometryType === BiometryTypes.TouchID) {
        console.log("TouchID is supported");
        pleaseEnableBiometric(true, false);
      } else if (available && biometryType === BiometryTypes.FaceID) {
        console.log("FaceID is supported");
        pleaseEnableBiometric(true, true);
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        console.log("Biometrics is supported");
        pleaseEnableBiometric(true, false);
      } else {
        console.log("Biometrics not supported");
        pleaseEnableBiometric(false, false);
      }
    });
  };

  useEffect(() => {
    if (isLoggedIn && isFocused) {
      navigation.navigate(NavigationRouteNames.HOME_TAB as never);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isEmpty(checkUserData) && isClickedContinue) {
      if (
        checkUserData?.userType &&
        checkUserData?.userType !== "rewards_user"
      ) {
        dispatch(
          getOrganizationInfo.trigger({
            organizationId: checkUserData?.organizationId,
          })
        );
      }

      setIsClickedContinue(false);
      if (checkUserData?.authType === authType?.EMAIL) {
        if (__DEV__) {
          loginFormData.setFieldValue("password", "OcaUser@123");
        }
        setIsShowPasswordField(true);
      }
      if (checkUserData?.authType === authType?.GOOGLE) {
        handleLoginWithGoogle();
      }
      if (checkUserData?.authType === authType?.MICROSOFT) {
        // _onLogin();
        setIsLoginWithAzure(true);
      }

      if (checkUserData?.error) {
        setErrorMessageInfo({
          title: localize("warning.emailNotFound"),
          description: localize("warning.emailNotFoundDesc"),
          buttonText: localize("common.tryAgainC"),
          usedFor: "error",
        });
        setShowErrorPopup(true);
      }
    }
  }, [checkUserData]);

  useEffect(() => {
    // GoogleSignin.configure({
    //   // Mandatory method to call before calling signIn()
    //   scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    //   // Repleace with your webClientId
    //   // Generated from Firebase console
    //   webClientId: '1:505515833737:android:40477734983bfa4ca18958',
    // });

    isEmpty(publicStaticData) && dispatch(getPublicStaticData.trigger());
    GoogleSignin.configure();
    // isSignedIn();

    loginFormData.validateForm();
  }, []);

  useEffect(() => {
    if (isLoginDone) {
      registerFcmToken();
      dispatch(getMyProfile.trigger({ userInfo }));
      dispatch(getKnowledgehubTag.trigger());
    }
  }, [isLoginDone]);

  useEffect(() => {
    if (!isEmpty(myProfileData)) {
      // detectBioMetricIsAvailable();
    }
  }, [myProfileData]);

  const closeErrorPopup = () => {
    setErrorMessageInfo({
      title: "",
      description: "",
      buttonText: "",
      usedFor: "",
    });
    setShowErrorPopup(false);
  };

  const pressedErrorPopupButton = () => {
    // Do some thing from here
    closeErrorPopup();
  };

  const registerFcmToken = () => {
    getFcmToken()
      .then(async (token) => {
        console.log({ registerFcmToken: token });

        if (token) {
          const payload = {
            deviceId: DeviceInfo.getDeviceId(),
            deviceToken: token,
            buildNumber: DeviceInfo.getBuildNumber(),
            buildId: await DeviceInfo.getBuildId(),
            uniqueId: await DeviceInfo.getUniqueId(),
            instanceId: await DeviceInfo.getInstanceId(),
            serialNumber: await DeviceInfo.getSerialNumber(),
            androidId: await DeviceInfo.getAndroidId(),
            ipAddress: await DeviceInfo.getIpAddress(),
            cameraPresent: await DeviceInfo.isCameraPresent(),
            macAddress: await DeviceInfo.getMacAddress(),
            manufacturer: await DeviceInfo.getManufacturer(),
            model: DeviceInfo.getModel(),
            brand: DeviceInfo.getBrand(),
            systemName: DeviceInfo.getSystemName(),
            systemVersion: DeviceInfo.getSystemVersion(),
            apiLevel: await DeviceInfo.getApiLevel(),
            readableVersion: DeviceInfo.getReadableVersion(),
            deviceName: await DeviceInfo.getDeviceName(),
            fontScale: await DeviceInfo.getFontScale(),
            bootloader: await DeviceInfo.getBootloader(),
            device: await DeviceInfo.getDevice(),
            display: await DeviceInfo.getDisplay(),
            fingerprint: await DeviceInfo.getFingerprint(),
            hardware: await DeviceInfo.getHardware(),
            host: await DeviceInfo.getHost(),
            product: await DeviceInfo.getProduct(),
            tags: await DeviceInfo.getTags(),
            type: await DeviceInfo.getType(),
            baseOs: await DeviceInfo.getBaseOs(),
            previewSdkInt: await DeviceInfo.getPreviewSdkInt(),
            securityPatch: await DeviceInfo.getSecurityPatch(),
            codename: await DeviceInfo.getCodename(),
            incremental: await DeviceInfo.getIncremental(),
            emulator: await DeviceInfo.isEmulator(),
            pinOrFingerprintSet: await DeviceInfo.isPinOrFingerprintSet(),
            hasNotch: DeviceInfo.hasNotch(),
            firstInstallTime: await DeviceInfo.getFirstInstallTime(),
            installReferrer: await DeviceInfo.getInstallReferrer(),
            lastUpdateTime: await DeviceInfo.getLastUpdateTime(),
            phoneNumber: await DeviceInfo.getPhoneNumber(),
            carrier: await DeviceInfo.getCarrier(),
            batteryLevel: await DeviceInfo.getBatteryLevel(),
            batteryCharging: await DeviceInfo.isBatteryCharging(),
            landscape: await DeviceInfo.isLandscape(),
            airplaneMode: await DeviceInfo.isAirplaneMode(),
            tablet: DeviceInfo.isTablet(),
            deviceType: DeviceInfo.getDeviceType(),
            locationEnabled: await DeviceInfo.isLocationEnabled(),
          };
          dispatch(registerDevice.trigger({ payload }));
        }
      })
      .catch((error) => console.log("Error", error));
  };

  const getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      setUserInfo(info);
      const payload = {
        firstName: info.user.givenName,
        lastName: info.user.familyName,
        email: info.user.email,
        googleId: info.user.id,
        phone_number: info.user?.phoneNumber ?? "",
        appleId: "",
        imageUrl: info.user.photo,
        location: {},
      };
      dispatch(doGoogleLogin.trigger({ payload }));
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // alertBox(localize('login.notSignIn'));
        setErrorMessageInfo({
          title: localize("common.error"),
          description: localize("login.notSignIn"),
          buttonText: localize("common.tryAgainC"),
          usedFor: "error",
        });
        setShowErrorPopup(true);
      } else {
        // alertBox(localize('login.userInfoError'));
        setErrorMessageInfo({
          title: localize("common.error"),
          description: localize("login.userInfoError"),
          buttonText: localize("common.tryAgainC"),
          usedFor: "error",
        });
        setShowErrorPopup(true);
      }
    }
  };

  const signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      const payload = {
        firstName: userInfo.user.givenName,
        lastName: userInfo.user.familyName,
        email: userInfo.user.email,
        googleId: userInfo.user.id,
        phone_number: userInfo.user?.phoneNumber ?? "",
        appleId: "",
        imageUrl: userInfo.user.photo,
        location: {},
      };

      if (
        loginFormData.values.username?.toLowerCase() !==
        userInfo.user.email?.toLowerCase()
      ) {
        // Error handle
        // alertBox('Error', 'User id not matched');
        setErrorMessageInfo({
          title: localize("common.error"),
          description: "User id not matched",
          buttonText: localize("common.tryAgainC"),
          usedFor: "error",
        });
        setShowErrorPopup(true);
      } else {
        setShowMicrosoftMessageForGoogle({ isVisible: true, payload });
      }
    } catch (error: any) {
      console.log("Message", JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // alertBox(localize('login.cancelled'));
        setErrorMessageInfo({
          title: localize("common.error"),
          description: localize("login.cancelled"),
          buttonText: localize("common.tryAgainC"),
          usedFor: "error",
        });
        setShowErrorPopup(true);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // alertBox(localize('login.inProgress'));
        setErrorMessageInfo({
          title: localize("common.warning"),
          description: localize("login.cancelled"),
          buttonText: localize("common.tryAgainC"),
          usedFor: "error",
        });
        setShowErrorPopup(true);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // alertBox(localize('login.notAvailable'));
        setErrorMessageInfo({
          title: localize("common.error"),
          description: localize("login.notAvailable"),
          buttonText: localize("common.tryAgainC"),
          usedFor: "error",
        });
        setShowErrorPopup(true);
      } else {
        // alertBox(error.message);
        setErrorMessageInfo({
          title: localize("common.error"),
          description: error?.message,
          buttonText: localize("common.tryAgainC"),
          usedFor: "error",
        });
        setShowErrorPopup(true);
      }
    }
  };

  const handleLoginWithGoogle = () => {
    signIn();
    console.log("Login with google");
  };

  const _onLogin = async (data) => {
    const azureAuth = new AzureAuth(data);
    let scope = "openid email profile User.Read offline_access";

    try {
      // Try to get cached token or refresh an expired ones
      let tokens = await azureAuth.auth.acquireTokenSilent({
        scope,
        userId: loginFormData.values?.username,
      });

      if (!tokens) {
        // No cached tokens or the requested scope defines new not yet consented permissions
        // Open a window for user interaction
        tokens = await azureAuth.webAuth.authorize({
          scope,
          prompt: "select_account",
        });
      }

      console.log("CRED>>>", tokens);

      if (tokens?.accessToken) {
        setaccessToken(tokens.accessToken);

        let info = await azureAuth.auth.msGraphRequest({
          token: tokens.accessToken,
          path: "me",
        });
        console.log("info", info);

        setuser({ ...info, userId: tokens.userId });

        const data = {
          // password: 'Huw30939',
          username: loginFormData.values?.username,
          tokenInfo: {
            ...info,
            ...tokens,
            account: {
              id: info.id,
              username: info.userId,
              name: info.userName,
            },
          },
        };
        callLoginWithFinalData(data);
      }
    } catch (error) {
      console.log("Error during Azure operation", error);
    }
  };

  const handleNeedhelp = () => {
    setNeedHelpOptionVisible(true);
  };

  const onSubmitEditing = (id: string) => {
    return inputs[id] ? inputs[id].focus() : null;
  };

  const callLoginWithFinalData = (data) => {
    dispatch(doLogin.trigger({ loginData: data }));
  };

  const handleGuestLogin = async () => {
    dispatch(
      checkUser.success({
        data: { userType: "guest_user", username: "guest.user@cenomi.com" },
      })
    );
  };

  const handleOnSubmit = async () => {
    if (!isEmpty(loginFormData.errors)) {
      if (loginFormData.errors.username) {
        setErrorMessageInfo({
          title: localize("common.warning"),
          description: loginFormData.errors.username,
          buttonText: localize("common.tryAgainC"),
          usedFor: "error",
        });
        setShowErrorPopup(true);
      }
    } else {
      if (isShowPasswordField) {
        if (loginFormData.values.password) {
          const data = {
            password: loginFormData.values.password,
            username: loginFormData.values.username,
          };
          trackEvent(EVENT_NAME.LOGIN_CONTINUE_BTN_TRIGGER, {
            authType: "email",
          });
          callLoginWithFinalData(data);
        } else {
          // alertBox('Warning', 'Password cannot be empty');
          setErrorMessageInfo({
            title: localize("common.warning"),
            description: localize("common.passwordCanNotBeEmpty"),
            buttonText: localize("common.tryAgainC"),
            usedFor: "error",
          });
          setShowErrorPopup(true);
        }
      } else if (showMicrosoftMessageForGoogle?.isVisible) {
        trackEvent(EVENT_NAME.LOGIN_CONTINUE_BTN_TRIGGER, {
          authType: "microsoft",
        });
        // _onLogin();
        setIsLoginWithAzure(true);
      } else {
        // check User called
        if (loginFormData?.values?.username === "") {
          setErrorMessageInfo({
            title: localize("common.warning"),
            description: localize("warning.emailCannotEmpty"),
            buttonText: localize("common.tryAgainC"),
            usedFor: "error",
          });
          setShowErrorPopup(true);
        } else {
          setIsClickedContinue(true);
          setTimeout(() => {
            const data = { username: loginFormData.values.username };
            trackEvent(EVENT_NAME.LOGIN_CHECK_USER);
            dispatch(checkUser.trigger({ data }));
          }, 500);
        }
      }
    }
    // }
  };

  const navigateToHome = () => {
    dispatch(getStaticData.trigger());
    dispatch(setIsLoggedIn.trigger());
    dispatch(setIsAutoLogin.trigger());
  };

  const onPressRememberMe = () => setIsRememberMe(!isRememberMe);

  const resetCheckUserLogic = () => {
    loginFormData.setFieldValue("password", "");
    setIsShowPasswordField(false);
  };

  const formSection = () => {
    return (
      <>
        <View style={{ alignItems: "center" }}>
          <CustomText
            fontSize={20}
            color={Colors.white}
            styling={{
              // marginLeft: WIDTH.W10,
              lineHeight: RfH(32),
              ...CommonStyles.regularFont500Style,
            }}
          >
            {localize("login.enterEmail")}
          </CustomText>
        </View>
        <View style={styles.inputBoxView}>
          <CustomTextInput
            label={localize("login.email")}
            accessibilityLabel={"loginScreenUsername"}
            placeholder={localize("login.placeholderEnterEmail")}
            value={loginFormData.values.username}
            onChangeHandler={(value) => {
              resetCheckUserLogic();
              loginFormData.setFieldValue(
                "username",
                value?.replaceAll(" ", "") || ""
              );
            }}
            returnKeyType={"next"}
            autoCapitalize={"none"}
            onSubmitEditing={() => onSubmitEditing("password")}
            isMandatory={false}
            autoCorrect={false}
          />

          {isShowPasswordField ? (
            <CustomTextInput
              label={localize("login.placeholderPassword")}
              accessibilityLabel={"loginScreenPassword"}
              placeholder={localize("login.placeholderEnterPassword")}
              secureTextEntry={!showPasswordField}
              showPasswordField={showPasswordField}
              autoCapitalize={"none"}
              handleShowPassword={(value) => setShowPasswordField(value)}
              icon={showPasswordField ? Images.openEye : Images.closeEye}
              value={loginFormData.values.password}
              onChangeHandler={(value) =>
                loginFormData.setFieldValue("password", value)
              }
              showClearButton={false}
              refKey={"password"}
              isMandatory={false}
              autoCorrect={false}
            />
          ) : null}

          <View style={styles.keepLoginMeContainer}>
            {/* <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={onPressRememberMe}>
              <CustomImage
                image={
                  isRememberMe
                    ? isDarkMode
                      ? Images.checkboxActiveWhite
                      : Images.radioSelected
                    : isDarkMode
                    ? Images.checkboxInactiveWhite
                    : Images.radioUnselected
                }
                imageHeight={20}
                imageWidth={20}
                styling={{ marginRight: RfW(5), marginBottom: RfH(Platform.OS === 'ios' ? 2 : 4) }}
              />
              <CustomText
                fontSize={14}
                styling={{
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(16)
                }}>
                {localize('login.rememberMe')}
              </CustomText>
            </TouchableOpacity> */}

            <CustomText
              fontSize={14}
              color={Colors.white}
              styling={{
                ...CommonStyles.regularFont500Style,
                lineHeight: RfH(16),
              }}
              onPress={handleNeedhelp}
            >
              {localize("login.needHelp")}
            </CustomText>
          </View>
        </View>
      </>
    );
  };

  const messageForMicrosoftLoginSection = () => {
    return (
      <View style={{ alignItems: "center", paddingTop: RfH(34) }}>
        <CustomText
          fontSize={20}
          styling={{
            ...CommonStyles.regularFont500Style,
            lineHeight: RfH(30),
            textAlign: "center",
          }}
        >
          {`${localize("common.welcome")} ${
            showMicrosoftMessageForGoogle?.payload?.firstName
          } ${showMicrosoftMessageForGoogle?.payload?.lastName}`}
        </CustomText>
        <CustomText
          fontSize={14}
          styling={{
            ...CommonStyles.regularFont400Style,
            lineHeight: RfH(24),
            paddingTop: RfH(30),
            paddingHorizontal: RfH(42),
            textAlign: "center",
          }}
        >
          {localize("login.microsoftDesc")}
        </CustomText>
      </View>
    );
  };

  const mainSection = () => {
    return (
      <>
        <View
          style={{
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.transparent,
          }}
        >
          <View style={{ alignItems: "center", paddingVertical: RfH(29) }}>
            <CustomImage
              image={
                isDarkMode ? Images.clientLogoWhite : Images.clientLogoWhite
              }
              imageHeight={45}
              imageWidth={83.95}
            />
          </View>

          {/* {__DEV__ && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: RfH(10),
                top: RfH(20),
                padding: RfH(10)
              }}
              onPress={() => setIsVisibleUserList(true)}>
              <CustomImage
                image={isDarkMode ? Images.optionsWhite : Images.more}
                imageHeight={isDarkMode ? 25 : 30}
                imageWidth={isDarkMode ? 25 : 30}
                tintColor={Colors.white}
              />
            </TouchableOpacity>
          )} */}

          {showMicrosoftMessageForGoogle?.isVisible
            ? messageForMicrosoftLoginSection()
            : formSection()}
          <View
            style={{
              ...styles.continueContainer2,
              marginTop: RfH(Platform.OS === "android" ? 55 : 69),
            }}
          >
            <AppPrimaryButton
              buttonText={localize("common.continue")}
              onPress={handleOnSubmit}
            />

            <View
              style={{
                marginTop: RfH(20),
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <CustomText
                fontSize={14}
                color={getColorWithOpacity(Colors.white, 0.75)}
                styling={{
                  marginRight: RfW(10),
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(16),
                }}
              >
                OR
              </CustomText>
              <CustomText
                fontSize={14}
                color={Colors.white}
                styling={{
                  ...CommonStyles.regularFont500Style,
                  lineHeight: RfH(16),
                  marginTop: RfH(Platform.OS === "ios" ? 2 : 0),
                }}
                onPress={handleGuestLogin}
              >
                {localize("login.continueAsGuest")}
              </CustomText>
            </View>
          </View>
        </View>
      </>
    );
  };

  const onPressOptions = (pressedItem) => {
    if (pressedItem === "faq") {
      setNeedHelpOptionVisible(false);
      navigation.navigate(NavigationRouteNames.FAQ as never);
    }
    if (pressedItem === "forgotPassword") {
      setNeedHelpOptionVisible(false);
      setCallCenterVisible(true);
    }
  };

  return (
    <WrapperContainer>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={[
            styles.mainContainer,
            {
              backgroundColor: isDarkMode
                ? Colors.darkModeBackground
                : Colors.transparent,
            },
          ]}
        >
          <ImageBackground
            source={Images.loginBg}
            style={styles.mainContainer}
          />
          <KeyboardAvoidingView
            behavior={Platform.select({ android: undefined, ios: "padding" })}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 44}
            enabled
          >
            <View
              style={[
                styles.loginInputContainer,
                isShowPasswordField ? { height: HEIGHT.H530 } : {},
              ]}
            >
              {mainSection()}
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>

      {openBiometric && (
        <Biometric
          isDarkMode={isDarkMode}
          isFaceIdEnable={isFaceIdEnabled}
          cancelButtonClick={() => {
            setOpenBiometric(false);
            console.log(
              "Biometric Opened - User cancelled request to enable biometric --> navigateToHome ------------------------",
              "isFaceIdEnabled ===",
              isFaceIdEnabled
            );
            navigateToHome();
          }}
          biometricEnableButtonClick={() => handleEnadleBiometric()}
          biometricModelVisible={openBiometric}
        />
      )}

      {showErrorPopup && (
        <CustomPopupModal
          isVisible={showErrorPopup}
          messageInfo={errorMessageInfo}
          closePopup={closeErrorPopup}
          pressedPopupButton={pressedErrorPopupButton}
        />
      )}
      <CustomBottomSheet
        title={localize("login.needHelp") || ""}
        rightIconWidth={RfH(14)}
        rightIconHeight={RfH(14)}
        isVisible={needHelpOptionVisible}
        onRequestClose={() => setNeedHelpOptionVisible(false)}
      >
        <NeedHelpPopup
          onPressOptions={onPressOptions}
          isDarkMode={isDarkMode}
        />
      </CustomBottomSheet>

      <CustomBottomSheet
        title={""}
        rightIconWidth={RfH(14)}
        rightIconHeight={RfH(14)}
        isVisible={callCenterVisible}
        onRequestClose={() => setCallCenterVisible(false)}
      >
        <CallCenterPopup
          sourceFrom={"forgotPassword"}
          isDarkMode={isDarkMode}
          onPressGoit={() => setCallCenterVisible(false)}
        />
      </CustomBottomSheet>

      <CustomBottomSheet
        title={""}
        rightIconWidth={RfH(14)}
        rightIconHeight={RfH(14)}
        isVisible={isVisibleUserList}
        onRequestClose={() => setIsVisibleUserList(false)}
      >
        <ScrollView
          style={{
            paddingBottom: RfH(35),
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.modalForegroundColor,
          }}
        >
          {/* {userList?.map((item) => {
            return (
              <TouchableOpacity
                style={{
                  padding: RfH(10),
                  marginHorizontal: RfH(10),
                  marginVertical: RfH(5),
                  ...darkCard
                }}
                onPress={() => {
                  setIsVisibleUserList(false);
                  loginFormData.setFieldValue('username', '');
                  setTimeout(() => {
                    loginFormData.setFieldValue('username', item?.value);
                  }, 500);
                }}>
                <CustomText color={Colors.white}>{item?.label}</CustomText>
              </TouchableOpacity>
            );
          })} */}
        </ScrollView>
      </CustomBottomSheet>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  loginInputContainer: {
    // backgroundColor: Colors.white,
    height: RfH(450),
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0,
  },
  inputBoxView: {
    marginHorizontal: 25,
  },
  inputLabelStyle: {
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    color: Colors.black,
  },
  inputTextStyle: {
    fontSize: 16,
    flex: 1,
    width: "100%",
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "left",
    color: Colors.black,
    padding: 0,
  },
  continueContainer: {
    marginHorizontal: 32,
    height: 48,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    marginTop: 75,
    borderRadius: BorderRadius.BR0,
  },
  continueContainer2: {
    marginHorizontal: 32,
    // height: 48,
    marginTop: 75,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 14,
    textAlign: "center",
  },
  keepLoginMeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    // justifyContent: 'space-between',
    marginTop: 20,
    alignItems: "center",
  },
  radioSelectorView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  keepMeText: {
    marginLeft: 5,
    fontSize: 14,
  },
  needHelp: {
    color: Colors.primary,
    fontSize: 14,
  },
  faceIdTextWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  usePasswordTextContainer: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.primary,
    borderWidth: 1,
    marginTop: HEIGHT.H16,
  },
});

export default LoginHome;
