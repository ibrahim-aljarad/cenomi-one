import React, { useEffect } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { CustomText, IconButtonWrapper } from "../../components";
import CustomModal from "../../components/CustomModal";
import { Colors, CommonStyles, Images } from "../../theme";
import { RfH, RfW } from "../../utils/helper";
import { deviceWidth, storeData } from "../../utils/helpers";
import { CONFIG_CONSTANT, LOCAL_STORAGE_DATA_KEY } from "../../utils/constants";
import { createStructuredSelector } from "reselect";
import { getMyProfileDetailsSelector } from "../LoginHome/redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { submitAcknowledge } from "../Home/redux/actions";
import WebView from "react-native-webview";

const stateSelector = createStructuredSelector({
  myProfileDetails: getMyProfileDetailsSelector,
});

const Quotes = (props: any) => {
  const { isVisible, item = {}, onRequestClose, isDarkMode } = props || {};
  const { myProfileDetails } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const [webViewVisible, setWebViewVisible] = React.useState(false);
  const [surveyUrl, setSurveyUrl] = React.useState(item?.quoteLink);
  const submittedRef = React.useRef(false);

  const injectedJavaScript = `
  // Flag to track if submission has been handled
  let hasSubmitted = false;

  // Function to check for the specific submission message
  function checkForSubmission() {
    if (hasSubmitted) return; // Skip if already submitted

    const elements = document.querySelectorAll('div, p, h1, h2, h3, h4, h5, span');
    for (const element of elements) {
      const text = element.innerText || '';
      if (text.includes('Your answers have been submitted successfully.') ||
          text.includes('Important thing you can do next')) {
        if (!hasSubmitted) {
          console.log('Found submission message!');
          hasSubmitted = true;
          window.ReactNativeWebView.postMessage('FORM_SUBMITTED');
        }
        return;
      }
    }
    // Check again after a short delay if not submitted
    if (!hasSubmitted) {
      setTimeout(checkForSubmission, 1000);
    }
  }

  // Start checking once the page is loaded
  document.addEventListener('DOMContentLoaded', () => {
    checkForSubmission();
  });

  // Start checking immediately in case the page is already loaded
  checkForSubmission();

  true; // Required for iOS
`;

  useEffect(() => {
    if (isVisible) {
      storeData(LOCAL_STORAGE_DATA_KEY.QUOTES_READED_DATA, {
        [myProfileDetails?.username]: item?.createdAt,
      });
    }
  }, [isVisible]);

  const handlePressItem = () => {
    submittedRef.current = false;
    setWebViewVisible(true);
  };

  const handleMessage = (event: any) => {
    if (event.nativeEvent.data === 'FORM_SUBMITTED') {
      if (submittedRef.current) return;
      submittedRef.current = true;

      console.log('Form was submitted!');
      setTimeout(() => {
        setWebViewVisible(false);
        onRequestClose();

        const info = {
          featureId: item?.id,
          featureModule: CONFIG_CONSTANT?.SURVEYS,
          metadata: {
            userName: myProfileDetails?.username,
            submittedOn: new Date().getTime(),
          },
        };
        console.log(info);
        dispatch(submitAcknowledge.trigger({ data: info }));
      }, 1500);
    }
  };



  const handleWebViewClose = () => {
    setWebViewVisible(false);
    onRequestClose();
  };

  if (!isVisible) return null;

  return (
    <CustomModal
      modalVisible={isVisible}
      onRequestClose={handleWebViewClose}
      modalStyle={{
        width: deviceWidth() - RfW(20),
        backgroundColor: isDarkMode ? Colors.darkModeShadow : Colors.white,
        paddingBottom: 0,
        height: webViewVisible ? Dimensions.get('window').height * 0.9 : 'auto',
      }}
    >
      {!webViewVisible ? (
        <View
          style={{
            maxHeight: RfH(380),
            width: "100%",
            backgroundColor: isDarkMode
              ? Colors.darkModeShadow
              : Colors.primaryContainerColor,
            paddingHorizontal: RfW(10),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ paddingTop: RfH(20) }}>
              <CustomText
                fontSize={18}
                styling={{ ...CommonStyles.regularFont500Style }}
              >
                {item?.internalName}
              </CustomText>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onRequestClose}
              style={{ marginRight: RfW(-12), padding: RfH(12) }}
            >
              <IconButtonWrapper
                iconWidth={RfH(18)}
                iconHeight={RfH(18)}
                iconImage={isDarkMode ? Images.crossWhite : Images.crossBlack}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: RfH(270),
              marginTop: RfH(15),
            }}
          >
            <View style={{ flex: 1 }}>
              <CustomText
                fontSize={22}
                styling={{
                  ...CommonStyles.regularFont500Style,
                  lineHeight: RfH(32),
                  marginLeft: RfW(15),
                  textAlign: "center",
                }}
              >
                {`${item?.quote}`}
              </CustomText>
              <CustomText
                numberOfLines={2}
                fontSize={12}
                styling={{
                  ...CommonStyles.regularFont500Style,
                  lineHeight: RfH(12),
                  marginLeft: RfW(2),
                  marginTop: RfH(10),
                  marginBottom: RfH(7),
                  textAlign: "center",
                }}
              >
                {item?.author || ""}
              </CustomText>

              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handlePressItem}
                >
                  <Text style={styles.buttonText}>
                    {item?.quote?.content?.[1]?.content?.[1]?.content?.[0]
                      ?.value || "Take a quiz"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, height: Dimensions.get('window').height * 0.9 }}>
          <View style={styles.webViewHeader}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleWebViewClose}
              style={{ padding: RfH(12) }}
            >
              <IconButtonWrapper
                iconWidth={RfH(18)}
                iconHeight={RfH(18)}
                iconImage={isDarkMode ? Images.crossWhite : Images.crossBlack}
              />
            </TouchableOpacity>
          </View>
          <WebView
            source={{ uri: surveyUrl }}
            injectedJavaScript={injectedJavaScript}
            onMessage={handleMessage}
            style={{ flex: 1 }}
          />
        </View>
      )}
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#804cc9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  webViewHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
  }
});

export default Quotes;
