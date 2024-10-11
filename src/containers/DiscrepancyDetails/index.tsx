import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import { isEmpty } from "lodash";
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { isLoadingSelector } from "../../appContainer/redux/selectors";
import {
  CustomText,
  HeaderSVG,
} from "../../components";
import { Colors, CommonStyles, Images } from "../../theme";
import {
  CC_TEMPLATE_TEXT,
} from "../../utils/constants";
import { getCorporateCommunicationDetailsSelector } from "../Home/redux/selectors";
import styles from "./styles";
import {
  isValidHtml,
} from "../../utils/helpers";
import { getMyProfileDetailsSelector } from "../LoginHome/redux/selectors";
import { isDarkModeSelector } from "../redux/selectors";
import WrapperContainer from "../../components/WrapperContainer";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const stateStructure = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
});

const DiscrepancyDetails = (props: any) => {
  const { id } = props.route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [step, setStep] = useState(1);


  const {
    isDarkMode,
  } = useSelector(stateStructure);

  const [info, setInfo] = useState({
    source: "",
    height: 0,
    title: "",
    template: "",
  });

  const backHandler = () => {
    setInfo({ source: "", height: 0, template: "", title: "" });
    navigation.goBack();
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("useCallback>>hardwareBackPress");
      if (isFocused) {
        BackHandler.addEventListener("hardwareBackPress", backHandler);
      }
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backHandler);
      };
    }, [isFocused])
  );

  return (
    <WrapperContainer>
      <SafeAreaView
        style={{
          ...styles.mainContainer,
          backgroundColor: isDarkMode
            ? info?.template !== CC_TEMPLATE_TEXT || !isValidHtml(info?.source)
              ? Colors.darkModeBackground
              : Colors.white
            : Colors.transparent,
        }}
      >
        <View
          style={{
            flex: 1,
            // paddingTop: RfH(10),
          }}
        >
          <HeaderSVG
            isRightButtonVisible={true}
            isBackButtonVisible={true}
            titleText="Dummy title"
            titleFont={20}
            onRightButtonClickHandler={() => {}}
            onBackPressHandler={() => backHandler()}
            isRight2BtnVisible={true}
            onRight2BtnClick={() => {}}
            containerStyle={{ zIndex: 99999 }}
          />
          <View style={styles.stepperNavigation}>
            {[1, 2, 3].map((number) => (
              <TouchableOpacity
                style={step === number ?[styles.stepperButton, {
                  backgroundColor: 'white'}] : styles.stepperButton}
                onPress={() => setStep(number)}
              >
                <CustomText styling={step === number ?styles.stepperTextActive: styles.stepperText}>{number}</CustomText>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.scrollContainer}>
            {step === 1 ? (
              <Step1 onContinue={() => setStep(2)} />
            ) : step === 2 ? (
              <Step2 onContinue={() => setStep(3)} />
            ) : step === 3 ? (
              <Step3 />
            ) : (
              <></>
            )}

            
          </View>
        </View>
        {/* <Loader isLoading={isLoading || partialLoading} /> */}
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default DiscrepancyDetails;
