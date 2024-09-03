import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Platform, SafeAreaView, View } from 'react-native';
import { CustomText, HeaderSVG } from '../../../components';
import CustomDropDown from '../../../components/CustomDropdown';
import { localize } from '../../../locale/utils';
import { Colors, CommonStyles } from '../../../theme';
import { RfH, RfW } from '../../../utils/helper';
import AcademicCards from '../components/AcademicCards';
import RecentlyAppliedListItems from '../components/RecentlyAppliedListItems';
import GradeItem from './GradeItem';
import styles from './styles';

const EducationClaimDetails = () => {
  const navigation = useNavigation();

  const renderHeader = () => {
    return (
      <View>
        <CustomDropDown
          // data={dropDownList}
          label={localize('hrRequest.academicYear')}
          placeholder={localize('hrRequest.academicYear')}
          isCard={true}
          onChange={(item) => {
            console.log('onChange', item.value);
          }}
        />
        <AcademicCards isShowButton={false} />
        {/* <FlatList
          data={}
          horizontal={true}
          overScrollMode={'never'}
          contentContainerStyle={{ paddingHorizontal: RfW(16) }}
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: RfH(12) }}
          renderItem={({ item, index }) => (
            <GradeItem item={item} index={index} singleTitle={true} />
          )}
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
        /> */}
        <CustomText
          fontSize={16}
          color={Colors.primaryBlack}
          styling={{
            ...CommonStyles.regularFont600Style,
            width: '80%',
            paddingHorizontal: RfW(24)
          }}>
          {localize('hrRequest.recentlyApplied')}
        </CustomText>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderSVG
        isRightButtonVisible={true}
        isBackButtonVisible={true}
        titleText={localize('hrRequest.educatinClaim')}
        titleFont={20}
        onRightButtonClickHandler={() => {}}
        onBackPressHandler={() => navigation.goBack()}
        isRight2BtnVisible={true}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: Colors.grey9
        }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader()}
          // data={fetchRecentAppliedListItems()}
          renderItem={({ item }) => (
            <View style={{ width: '100%', paddingHorizontal: RfW(2) }}>
              <RecentlyAppliedListItems leaveItem={item} onPress={() => {}} />
            </View>
          )}
          style={{ marginTop: RfH(15) }}
          // scrollEnabled={modules.length > 20}

          ListFooterComponent={
            <View style={{ height: Platform.OS === 'ios' ? RfH(50) : RfH(100) }} />
          }
          overScrollMode={'never'}
        />
      </View>
    </SafeAreaView>
  );
};

export default EducationClaimDetails;
