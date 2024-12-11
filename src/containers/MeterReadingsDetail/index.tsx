import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import WrapperContainer from '../../components/WrapperContainer';
import { Colors, CommonStyles } from '../../theme';
import {
  CustomText,
  HeaderSVG,
} from '../../components';
import { ThemeProvider } from '../../theme/context';
import { RfH, RfW } from '../../utils/helper';
import { isDarkModeSelector } from '../redux/selectors';
import TenantImageViewer from '../../components/TenantImageViewer';
import COLORS from '../../theme/colors';
import { SCREEN_WIDTH } from '../../constant';

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
        {value || 'N/A'}
      </CustomText>
    </View>
  </View>
);

export default function MeterReadingDetails({ route, navigation }) {
  const { meterDetails, srId, meterId } = route.params;
  const { isDarkMode } = useSelector(stateSelector);

  const details = [
    { label: 'Service Request ID', value: meterDetails['service-request-id'] },
    { label: 'Meter Reading ID', value: meterDetails['meter-reading-id'] },
    { label: 'Property Group', value: meterDetails['property-group-name'] || 'N/A' },
    { label: 'Property Code', value: meterDetails['yardi-property-code'] },
    { label: 'Meter Number', value: meterDetails['meter-no'] },
    { label: 'Meter Digit', value: meterDetails['meter-digit'] },
    { label: 'Bill Category', value: meterDetails['bill-category'] },
    { label: 'Sub Station', value: meterDetails['sub-station'] },
    { label: 'Area', value: meterDetails['area'] },
    { label: 'Ampere', value: meterDetails['ampere'] },
    { label: 'CT Value', value: meterDetails['ct-value'] },
    { label: 'Previous Reading', value: meterDetails['previous-reading'] },
    { label: 'Present Reading', value: meterDetails['present-reading'] },
    { label: 'Status', value: meterDetails['status'] },
    { label: 'Created Date', value: new Date(meterDetails['created-date']).toLocaleDateString() },
    { label: 'Updated Date', value: new Date(meterDetails['updated-date']).toLocaleDateString() },
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
            titleText={`Meter Details: ${meterDetails['meter-reading-id']}`}
            titleFont={20}
            onBackPressHandler={() => navigation.goBack()}
          />
        </ThemeProvider>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {meterDetails['document-ids'] && (
            <View style={styles.imageContainer}>
               <TenantImageViewer
                docId={Array.isArray(meterDetails['document-ids'])
                  ? meterDetails['document-ids'][0]
                  : meterDetails['document-ids']}
                key={meterDetails['meter-reading-id']}
                imageWidth={SCREEN_WIDTH - RfW(32)}
                imageHeight={SCREEN_WIDTH - RfW(32)}
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
    overflow: 'hidden',
    backgroundColor: 'transparent', 
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
    flexDirection: 'row',
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
