import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { CustomButton, CustomText, HeaderSVG } from "../../components";
import { Colors, CommonStyles, Images } from "../../theme";
import { CC_TEMPLATE_TEXT } from "../../utils/constants";
import styles from "./styles";
import { alertBox, isValidHtml } from "../../utils/helpers";
import { isDarkModeSelector } from "../redux/selectors";
import WrapperContainer from "../../components/WrapperContainer";
import Step1 from "./Step1";
import Step2 from "./Step2";
import {
  getDiscrepancyDetailDataSelector,
  saveUnitDiscrepancySelector,
} from "./redux/selectors";
import {
  clearDiscrepancy,
  getDiscrepancyDetail,
  saveUnitDicrepancy,
} from "./redux/actions";
import { RfH, RfW } from "../../utils/helper";
import { localize } from "../../locale/utils";
import CustomModal from "../../components/CustomModal";
import { ThemeProvider } from "../../theme/context";

const stateStructure = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  discrepancyDetailData: getDiscrepancyDetailDataSelector,
  saveUnitDiscrepancyData: saveUnitDiscrepancySelector,
});

const DiscrepancyDetails = (props: any) => {
  const { id, property, srId, operations } = props.route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [step, setStep] = useState(1);
  const [statusModal, setStatusModal] = useState(false);

  const [selectValues, setSelectValues] = useState<any>({
    level: null,
    unit: null,
    storeClosed: false,
    wrongLocation: false,
    brandChanged: false,
    openWithoutContract: false,
    others: false,
    othersText: "",
    comment: "",
    documentId: [],
    reviewStatus: "",
  });

  const { isDarkMode, discrepancyDetailData, saveUnitDiscrepancyData } =
    useSelector(stateStructure);
  const [isFinalSubmit, setIsFinalSubmit] = useState(false);
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

  useEffect(() => {
    dispatch(clearDiscrepancy.trigger());
    dispatch(getDiscrepancyDetail.trigger(id));
  }, []);

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

  const step1Continue = () => {
    if (!selectValues?.level)
      return alertBox(
        localize("discrepancy.selectFloor"),
        localize("discrepancy.selectFloorDesc")
      );
    if (!selectValues?.unit)
      return alertBox(
        localize("discrepancy.selectUnit"),
        localize("discrepancy.selectUnitDesc")
      );
    setStep(2);
  };

  const handleClose = () => {
    setStatusModal(false);
    if (isFinalSubmit) {
      backHandler();
    }
  };

  useEffect(() => {
    if (saveUnitDiscrepancyData === "success") {
      setStep(1);
      setStatusModal(true);
      dispatch(clearDiscrepancy.trigger());
      dispatch(getDiscrepancyDetail.trigger(id));
      setSelectValues({
        level: null,
        unit: null,
        storeClosed: false,
        wrongLocation: false,
        brandChanged: false,
        openWithoutContract: false,
        others: false,
        othersText: "",
        comment: "",
        documentId: [],
        reviewStatus: "",
      });
    }
  }, [saveUnitDiscrepancyData]);

  const stepsIterator = [
    {
      step: 1,
    },
    {
      step: 2,
      disabled: !selectValues?.level || !selectValues?.unit,
    },
  ];
  const handleSubmit = () => {
    if (!operations) {
      alertBox(
        localize("common.error"),
        localize("discrepancy.invalidRequest")
      );
      return;
    }

    const levelOneOperations = operations.filter(
      (op) => op.workflow_level === 1
    );
    const allLevelOneInProgress = levelOneOperations.every(
      (op) => op.status === "IN_PROGRESS"
    );

    if (!allLevelOneInProgress) {
      alertBox(
        localize("common.error"),
        localize("discrepancy.level1ApproverNotInProgress")
      );
      return;
    }

    setIsFinalSubmit(true);
    const params = {
      service_request_id: parseInt(srId),
      status: "SUBMITTED",
    };
    dispatch(saveUnitDicrepancy.trigger(params));
  };

  return (
    <WrapperContainer showOverlay>
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
        <ScrollView
          style={{
            flex: 1,
            // paddingTop: RfH(10),
          }}
        >
          <ThemeProvider useNewStyles={true}>
            <HeaderSVG
              isRightButtonVisible={true}
              isBackButtonVisible={true}
              titleText={`${localize("common.serviceRequest")}: ${srId}`}
              titleFont={20}
              onRightButtonClickHandler={() => {}}
              onBackPressHandler={() => backHandler()}
              isRight2BtnVisible={true}
              onRight2BtnClick={() => {}}
              containerStyle={{ zIndex: 99999 }}
            />
          </ThemeProvider>
          <View style={styles.stepperNavigation}>
            {stepsIterator.map(({ step: stepNumber, disabled }) => (
              <TouchableOpacity
                style={
                  step === stepNumber
                    ? [
                        styles.stepperButton,
                        {
                          backgroundColor: "white",
                          borderColor: "white",
                        },
                      ]
                    : [
                        styles.stepperButton,
                        {
                          // backgroundColor: disabled ? "gray" : "",
                          borderColor: disabled ? "gray" : "white",
                        },
                      ]
                }
                disabled={disabled}
                onPress={() => (!disabled ? setStep(stepNumber) : "")}
              >
                <CustomText
                  styling={
                    step === stepNumber
                      ? styles.stepperTextActive
                      : styles.stepperText
                  }
                >
                  {stepNumber}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.scrollContainer}>
            {step === 1 ? (
              <Step1
                onContinue={step1Continue}
                property={property}
                selectValues={selectValues}
                setSelectValues={setSelectValues}
                srId={srId}
              />
            ) : step === 2 ? (
              <Step2
                setStep={setStep}
                selectValues={selectValues}
                setSelectValues={setSelectValues}
                srId={srId}
                operations={operations}
              />
            ) : (
              <></>
            )}
            {step === 1 && !!discrepancyDetailData && (
              <View
                style={{
                  marginTop: RfH(14),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: RfW(15),
                }}
              >
                <CustomText
                  fontSize={14}
                  color={Colors.white}
                  styling={{
                    marginStart: RfW(5),
                    lineHeight: RfH(20),
                    ...CommonStyles.boldFontStyle,
                  }}
                >
                  {localize("discrepancy.remainingUnits")} :
                </CustomText>
                <CustomText
                  fontSize={14}
                  color={Colors.white}
                  styling={{
                    marginStart: RfW(5),
                    lineHeight: RfH(20),
                    ...CommonStyles.boldFontStyle,
                  }}
                >
                  {discrepancyDetailData?.RemainingUnits}
                </CustomText>
              </View>
            )}

            {statusModal && (
              <ThemeProvider useNewStyles={true}>
                <CustomModal
                  title={localize(
                    isFinalSubmit
                      ? "discrepancy.submitted"
                      : "discrepancy.saved"
                  )}
                  modalVisible={true}
                  onRequestClose={handleClose}
                  onRequestActionButton={handleClose}
                />
              </ThemeProvider>
            )}
          </View>
          {step === 1 && (
            <CustomButton
              buttonText={localize("discrepancy.submitAll")}
              showSeperator={false}
              btnContainerStyle={styles.submitButtonStyle}
              handleOnSubmit={handleSubmit}
              isDisable={
                !operations ||
                !operations
                  .filter((op) => op.workflow_level === 1)
                  .every((op) => op.status === "IN_PROGRESS")
              }
            />
          )}
        </ScrollView>
        {/* <Loader isLoading={isLoading || partialLoading} /> */}
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default DiscrepancyDetails;
