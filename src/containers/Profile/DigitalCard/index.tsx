import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText, HeaderSVG, IconButtonWrapper } from '../../../components';
import { localize } from '../../../locale/utils';
import { Colors, CommonStyles, Images } from '../../../theme';
import { BorderRadius } from '../../../theme/sizes';
import { EVENT_NAME, trackEvent } from '../../../utils/analytics';
import { PHONE_W1 } from '../../../utils/constants';
import {
  getColorWithOpacity,
  getPhoneNumBytype,
  getWorkHomeMobilePhoneNumber
} from '../../../utils/helper';
import { RfH, RfW, deviceWidth } from '../../../utils/helpers';
import { getMyProfileDetailsSelector } from '../../LoginHome/redux/selectors';
import { isDarkModeSelector } from '../../redux/selectors';
import EditProfileImage from '../EditProfileImage';
import WrapperContainer from '../../../components/WrapperContainer';

const stateSelector = createStructuredSelector({
  myProfileData: getMyProfileDetailsSelector,
  isDarkMode: isDarkModeSelector
});

function DigitalCard({}): JSX.Element {
  const navigation = useNavigation();
  const { myProfileData, isDarkMode } = useSelector(stateSelector);
  const [userDetail, setUserDetail] = useState('');
  const [QrCodedata, setQrCodedata] = useState('');

  const {
    profile: {
      displayName,
      emails,
      workRelationships,
      phones,
      firstName,
      middleName,
      lastName
    } = {}
  } = userDetail || {};
  const {
    startDate: joiningDate,
    legalEmployerName,
    legalEntityId,
    assignments
  }: any = workRelationships?.length > 0 ? workRelationships[0] : {};

  const {
    managers,
    assignmentName,
    departmentName,
    businessUnitName,
    locationCode,
    gradeCode
  }: any = assignments?.length > 0 ? assignments[0] : {};

  const cardContainer = {
    backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
    borderRadius: BorderRadius.BR15
  };

  useEffect(() => {
    trackEvent(EVENT_NAME.SCREEN_DIGITAL_CARD);
    setUserDetail(myProfileData);
  }, []);

  useEffect(() => {
    try {
      if (userDetail) {
        setQrCodedata(
          `BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${
            firstName + (middleName?.length > 0 ? ';' + middleName : '')
          }\nFN:${displayName}\nTITLE:${assignmentName}\nORG:${legalEmployerName};${departmentName}\nURL:${
            myProfileData?.organization?.website
          }\nEMAIL;type=WORK:${userDetail.username}\nTEL;type=WORK;type=pref:${getPhoneNumBytype(
            PHONE_W1,
            phones
          )}\nTEL;type=Mobile:${getWorkHomeMobilePhoneNumber(phones)}\nEND:VCARD`
        );
      }
    } catch (error) {
      // Handle error
    }
  }, [userDetail]);

  const handleOnShare = () => {
    Share.share({ message: 'Share for testiing purpose2!!!' });
  };

  const renderOCAContainer = () => (
    <View
      style={{
        paddingLeft: RfW(18),
        paddingRight: RfW(12),
        paddingTop: RfH(10),
        paddingBottom: RfH(19)
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <View style={{}}>
          <CustomImage
            image={Images.clientLogoWhite}
            imageHeight={RfH(25)}
            imageWidth={RfW(64)}
            imageResizeMode={'contain'}
            tintColor={Colors.darkPurple}
          />
        </View>
      </View>

      <View
        style={{
          marginTop: RfH(23),
          flexDirection: 'row'
        }}>
        <EditProfileImage isHideEditOption={true} />
        <View style={{ flex: 1, marginLeft: RfW(20) }}>
          <CustomText
            fontSize={16}
            color={Colors.darkPurple}
            styling={{
              lineHeight: RfH(22),
              marginTop: RfH(2),
              ...CommonStyles.regularFont500Style
            }}>
            {displayName || ''}
          </CustomText>
          <CustomText
            fontSize={12}
            color={Colors.darkPurple}
            styling={{
              lineHeight: RfH(20),
              ...CommonStyles.regularFont400Style
            }}>
            {assignmentName || ''}
          </CustomText>
          <CustomText
            fontSize={12}
            color={Colors.darkPurple}
            styling={{
              lineHeight: RfH(20),
              marginTop: RfH(1),
              ...CommonStyles.regularFont400Style
            }}>
            {`${departmentName} Cenomi Centers`}
          </CustomText>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginBottom: RfH(2),
          marginTop: RfH(40),
          justifyContent: 'space-between'
        }}>
        <View style={{ width: '50%' }}>
          <CustomText
            fontSize={12}
            color={Colors.darkPurple}
            styling={{ ...CommonStyles.regularFont500Style }}>
            {localize('profile.mobileNumber')}
          </CustomText>
          <CustomText
            fontSize={14}
            color={Colors.darkPurple}
            styling={{
              marginTop: RfH(3),
              lineHeight: RfH(20),
              ...CommonStyles.regularFont400Style
            }}>
            {getWorkHomeMobilePhoneNumber(phones)}
          </CustomText>
        </View>
        <View style={{ width: '50%' }}>
          <CustomText
            fontSize={12}
            color={Colors.darkPurple}
            styling={{ ...CommonStyles.regularFont500Style }}>
            {localize('profile.workPhone')}
          </CustomText>
          <CustomText
            fontSize={14}
            color={Colors.darkPurple}
            styling={{
              marginTop: RfH(3),
              lineHeight: RfH(20),
              ...CommonStyles.regularFont400Style
            }}>
            {getPhoneNumBytype(PHONE_W1, phones)}
          </CustomText>
        </View>
      </View>
    </View>
  );

  const renderCard = () => (
    <ScrollView
      overScrollMode={'never'}
      showsVerticalScrollIndicator={false}
      style={{
        paddingHorizontal: RfW(24),
        backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
      }}>
      <View
        style={{
          flex: 1,
          marginTop: RfH(10),
          marginBottom: RfH(20)
        }}>
        {/* <ImageBackground
          style={{
            width: '100%',
            overflow: 'hidden',
            borderRadius: BorderRadius.BR0
          }}
          source={Images.profileBackgroundDark}
          resizeMode={'stretch'}
          imageStyle={{
            borderRadius: BorderRadius.BR0,
            width: '100%',
            overflow: 'hidden'
          }}>
          {renderOCAContainer()}
        </ImageBackground> */}
        <View style={{ ...cardContainer, marginTop: RfH(10) }}>{renderOCAContainer()}</View>
        {!isEmpty(QrCodedata) && (
          <View
            style={{
              marginTop: RfW(20),
              padding: RfW(15),
              alignItems: 'center',
              ...cardContainer
            }}>
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.white : Colors.transparent,
                padding: RfH(5)
              }}>
              <QRCode
                value={QrCodedata}
                size={deviceWidth() - RfW(84)}
                // logo={Images.clientLogoCircle}
                logoSize={RfW(82)}
                logoBackgroundColor={'transparent'}
                color={Colors.darkPurple}
                backgroundColor={Colors.transparent}
              />
            </View>
            <CustomText
              fontSize={14}
              color={isDarkMode ? Colors.white : Colors.darkPurple}
              styling={{
                marginTop: RfH(28),
                textAlign: 'center',
                lineHeight: RfH(16),
                ...CommonStyles.regularFontStyle
              }}>
              {localize('profile.askYourFriendShareMsg')}
            </CustomText>
          </View>
        )}
      </View>
    </ScrollView>
  );
  return (
    <WrapperContainer>
      <SafeAreaView
        style={{
          ...styles.mainContainer,
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
        }}>
        <View
          style={{
            paddingTop: RfH(10),
            flex: 1
          }}>
          <HeaderSVG
            isBackButtonVisible={false}
            isRightButtonVisible={true}
            titleText={localize('profile.digitalBusinessCard')}
            titleFont={20}
            titleStyle={{ marginLeft: -RfW(70) }}
            rightIcon={
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  paddingBottom: RfH(7),
                  paddingLeft: RfW(24)
                }}
                onPress={() => navigation.goBack()}>
                <IconButtonWrapper
                  iconHeight={18}
                  iconWidth={18}
                  iconImage={isDarkMode ? Images.crossWhite : Images.crossWhite}
                />
              </TouchableOpacity>
            }
          />
          {!isEmpty(userDetail) ? renderCard() : <></>}
        </View>
      </SafeAreaView>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },

  updatePictureView: {
    position: 'absolute',
    right: RfH(-10),
    bottom: RfH(-10),
    padding: RfH(10)
  }
});

export default DigitalCard;
