import React from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";

import WrapperContainer from "../../components/WrapperContainer";
import { Colors, CommonStyles } from "../../theme";
import { CustomText, HeaderSVG } from "../../components";
import { ThemeProvider } from "../../theme/context";
import { RfH, RfW } from "../../utils/helper";
import { isDarkModeSelector } from "../redux/selectors";
import TenantImageViewer from "../../components/TenantImageViewer";
import COLORS from "../../theme/colors";
import { localize } from "../../locale/utils";

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
});

const DetailRow = ({ label, value }) => (
  <View style={styles.cellContainerView}>
    <View style={styles.labelContainer}>
      <CustomText
        fontSize={14}
        color={Colors.darkGrey113}
        styling={CommonStyles.regularFont400Style}
      >
        {label}
      </CustomText>
    </View>
    <View style={styles.valueContainer}>
      <CustomText
        fontSize={14}
        color={Colors.black}
        styling={CommonStyles.regularFont400Style}
      >
        {value || localize("common.notAvailable")}
      </CustomText>
    </View>
  </View>
);

export default function MeterReadingDetails({ route, navigation }) {
  const { meterDetails } = route.params;
  const { isDarkMode } = useSelector(stateSelector);

  const details = [
    {
      label: localize("meterReadings.serviceRequestId"),
      value: meterDetails["service-request-id"],
    },
    {
      label: localize("meterReadings.meterReadingId"),
      value: meterDetails["meter-reading-id"],
    },
    {
      label: localize("meterReadings.propertyGroup"),
      value:
        meterDetails["property-group-name"] || localize("common.notAvailable"),
    },
    {
      label: localize("meterReadings.propertyCode"),
      value:
        meterDetails["yardi-property-code"] || localize("common.notAvailable"),
    },
    {
      label: localize("meterReadings.meterNumber"),
      value: meterDetails["meter-no"] || localize("common.notAvailable"),
    },
    {
      label: localize("meterReadings.meterDigit"),
      value: meterDetails["meter-digit"] || localize("common.notAvailable"),
    },
    {
      label: localize("meterReadings.billCategory"),
      value: meterDetails["bill-category"] || localize("common.notAvailable"),
    },
    {
      label: localize("meterReadings.subStation"),
      value: meterDetails["sub-station"] || localize("common.notAvailable"),
    },
    {
      label: localize("meterReadings.area"),
      value: meterDetails["area"] || localize("common.notAvailable"),
    },
    {
      label: localize("meterReadings.ampere"),
      value: meterDetails["ampere"] || localize("common.notAvailable"),
    },
    {
      label: localize("meterReadings.ctValue"),
      value: meterDetails["ct-value"] || localize("common.notAvailable"),
    },
    {
      label: localize("meterReadings.previousReading"),
      value:
        meterDetails["previous-reading"] || localize("common.notAvailable"),
    },
    {
      label: localize("meterReadings.presentReading"),
      value: meterDetails["present-reading"] || localize("common.notAvailable"),
    },
    {
      label: localize("meterReadings.status"),
      value: meterDetails["status"] || localize("common.notAvailable"),
    },
    {
      label: localize("meterReadings.createdDate"),
      value:
        new Date(meterDetails["created-date"]).toLocaleDateString() ||
        localize("common.notAvailable"),
    },
    {
      label: localize("meterReadings.updatedDate"),
      value:
        new Date(meterDetails["updated-date"]).toLocaleDateString() ||
        localize("common.notAvailable"),
    },
  ];

  return (
    <WrapperContainer showOverlay>
      <SafeAreaView
        style={[
          styles.mainContainer,
          {
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.transparent,
          },
        ]}
      >
        <ThemeProvider useNewStyles={true}>
          <HeaderSVG
            isBackButtonVisible={true}
            titleText={`${localize("meterReadings.meterDetails")}: ${
              meterDetails["meter-reading-id"]
            }`}
            titleFont={20}
            onBackPressHandler={() => navigation.goBack()}
          />
        </ThemeProvider>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {meterDetails["document-ids"] && (
            <View style={styles.imageContainer}>
              <TenantImageViewer
                docId={
                  Array.isArray(meterDetails["document-ids"])
                    ? meterDetails["document-ids"][0]
                    : meterDetails["document-ids"]
                }
                fullSize={true}
              />
            </View>
          )}

          <View style={styles.detailsContainer}>
            {details.map((detail, index) => (
              <DetailRow
                key={index}
                label={detail.label}
                value={detail.value}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: RfW(16),
  },
  imageContainer: {
    marginBottom: RfH(24),
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  detailsContainer: {
    backgroundColor: Colors.white,
    padding: RfW(16),
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cellContainerView: {
    flexDirection: "row",
    paddingVertical: RfH(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  labelContainer: {
    width: "40%",
    paddingRight: RfW(10),
  },
  valueContainer: {
    flex: 1,
  },
});
