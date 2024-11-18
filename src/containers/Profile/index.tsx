import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import RNFS from 'react-native-fs';
import * as PushNotification from 'react-native-push-notification';
import Share from 'react-native-share';
import vCard from 'react-native-vcards';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  CustomImage,
  CustomModalWebView,
  CustomText,
  HeaderSVG,
  IconButtonWrapper
} from '../../components';
import ScanQrCodeModal from '../../components/ScanQrCodeModal';
import { localize } from '../../locale/utils';
import NavigationRouteNames from '../../routes/ScreenNames';
import { Colors, CommonStyles, Images } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { EVENT_NAME, trackEvent } from '../../utils/analytics';
import Config from '../../utils/config';
import {
  APP_VERSION,
  BUILD_NUMBER,
  LINE_MANAGER,
  LOCAL_STORAGE_DATA_KEY,
  PHONE_W1
} from '../../utils/constants';
import {
  getColorWithOpacity,
  getPhoneNumBytype,
  getWorkHomeMobilePhoneNumber
} from '../../utils/helper';
import {
  RfH,
  RfW,
  alertBox,
  deviceWidth,
  getSaveData,
  removeData,
  storeData
} from '../../utils/helpers';
import { doLogout } from '../LoginHome/redux/actions';
import {
  getMyProfileDetailsSelector,
  getOrganizationDetailsSelector,
  isLoggedOutDoneSelector
} from '../LoginHome/redux/selectors';
import { getPublicStaticDataSelector, isDarkModeSelector } from '../redux/selectors';
import EditProfileImage from './EditProfileImage';
import MenuListComponent from './MenuListComponent';
import { profileMenu } from './serializer';
import WrapperContainer from '../../components/WrapperContainer';

const stateSelector = createStructuredSelector({
  myProfileData: getMyProfileDetailsSelector,
  isLoggedOutDone: isLoggedOutDoneSelector,
  publicStaticData: getPublicStaticDataSelector,
  isDarkMode: isDarkModeSelector,
  orgainzationDetails: getOrganizationDetailsSelector
});

const rnBiometrics = new ReactNativeBiometrics();

function Profile({}): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { myProfileData, isLoggedOutDone, publicStaticData, isDarkMode, orgainzationDetails } =
    useSelector(stateSelector);

  const [userDetail, setUserDetail] = useState({});
  const [qrCodeData, setQrCodeData] = useState('');
  const [vCardProfile, setVCardProfile] = useState({});
  const [profileMenus, setProfileMenus] = useState([]);
  const [showScanQrCodeModal, setShowScanQrCodeModal] = useState(false);
  const [webViewModalInfo, setWebViewModalInfo] = useState({
    isVisible: false,
    url: '',
    title: ''
  });
  const [isWebViewLoading, setIsWebViewLoading] = useState(false);
  const [isSensorAvailable, setSensorAvailable] = useState(false);
  const [biometricSwitch, setBiometricSwitch] = useState(false);
  const [isPressedLogout, setIsPressedLogout] = useState(false);

  const {
    profile: {
      displayName,
      emails,
      workRelationships,
      phones,
      firstName,
      middleName,
      lastName,
      employeeId
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
    locationDetails,
    gradeCode
  }: any = assignments?.length > 0 ? assignments[0] : {};

  const setBiometricOptionEnable = () => {
    setSensorAvailable(true);
    getSaveData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE).then(async (isBioEnabled) => {
      if (isBioEnabled) {
        const isBioData = JSON.parse(isBioEnabled);
        setBiometricSwitch(isBioData);
      }
    });
  };

  // const _onLogout = (data) => {};

  useEffect(() => {
    if (isLoggedOutDone && isPressedLogout) {
      setIsPressedLogout(false);
      PushNotification.setApplicationIconBadgeNumber(0);

      // if (!isEmpty(orgainzationDetails)) {
      //   const { externalIntegrations } = orgainzationDetails || {};
      //   const filteredItem =
      //     externalIntegrations?.length > 0
      //       ? externalIntegrations?.find((item) => item?.type === externalUserType?.AZURE_AD)
      //       : {};
      //   const data = {
      //     clientId: filteredItem?.config?.clientId || '',
      //     tenant: filteredItem?.config?.tenantId || ''
      //   };

      //   _onLogout(data);
      // }
    }
  }, [isLoggedOutDone]);

  useEffect(() => {
    AsyncStorage.getAllKeys().then((keys) => {
      AsyncStorage.multiGet(keys).then((d) => {
        console.log(d);
      });
    });
  }, []);

  useEffect(() => {
    getSaveData(LOCAL_STORAGE_DATA_KEY.IS_REMEMBER_ME).then((data) => {
      if (JSON.parse(data) === true) {
        rnBiometrics.isSensorAvailable().then((resultObject) => {
          const { available, biometryType } = resultObject;
          if (available && biometryType === BiometryTypes.TouchID) {
            console.log('TouchID is supported');
            setBiometricOptionEnable();
          } else if (available && biometryType === BiometryTypes.FaceID) {
            setBiometricOptionEnable();
            console.log('FaceID is supported');
          } else if (available && biometryType === BiometryTypes.Biometrics) {
            setBiometricOptionEnable();
            console.log('Biometrics is supported');
          } else {
            setSensorAvailable(false);
            console.log('Biometrics not supported');
          }
        });
      } else {
        setBiometricSwitch(false);
        setSensorAvailable(false);
      }
    });
  }, []);

  useEffect(() => {
    trackEvent(EVENT_NAME.SCREEN_PROFILE);
    setUserDetail(myProfileData);
    setProfileMenus(profileMenu());
  }, [myProfileData]);

  useEffect(() => {
    try {
      if (!isEmpty(userDetail?.profile?.firstName)) {
        console.log('myProfileData?.firstName', myProfileData?.profile?.firstName);

        setQrCodeData(
          `BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${
            firstName + (middleName?.length > 0 ? ';' + middleName : '')
          }\nFN:${displayName}\nTITLE:${assignmentName}\nORG:${legalEmployerName};${departmentName}\nURL:${
            myProfileData?.organization?.website
          }\nEMAIL;type=WORK:${userDetail.username}\nTEL;type=WORK;type=pref:${getPhoneNumBytype(
            PHONE_W1,
            phones
          )}\nTEL;type=Mobile:${getWorkHomeMobilePhoneNumber(phones)}\nEND:VCARD`
        );

        let vCardData = vCard();
        vCardData.email = userDetail.username;
        vCardData.firstName = firstName || '';
        vCardData.middleName = middleName || '';
        vCardData.lastName = lastName || '';
        vCardData.organization = legalEmployerName;
        vCardData.workPhone = getPhoneNumBytype(PHONE_W1, phones);
        vCardData.cellPhone = getWorkHomeMobilePhoneNumber(phones);
        vCardData.role = departmentName;
        vCardData.title = assignmentName;
        vCardData.workUrl = myProfileData?.organization?.website;
        vCardData.version = '3.0';
        // const fileBaseLocation = ReactNativeBlobUtil.fs.dirs.DownloadDir;
        // const fileBaseLocation = `${RNFS.ExternalStorageDirectoryPath}`;
        const fileBaseLocation = `${RNFS.DocumentDirectoryPath}`;

        const filenew = `${fileBaseLocation}/${firstName}-business-card.vcf`;

        // vCardData.saveToFile(file);
        vCardData.saveToFile(filenew);

        const businesCarddata = {
          url: 'file://' + filenew,
          title: firstName + ' business card',
          subject: firstName + ' business card'
        };

        setVCardProfile(businesCarddata);
      }
    } catch (error) {
      // Handle error
    }
  }, [userDetail]);

  const handleOnShare = () => {
    trackEvent(EVENT_NAME.PRESSED_PROFILE_SHARE_BTN);
    Share.open(vCardProfile);
  };

  const handleQrCode = () => {
    trackEvent(EVENT_NAME.PRESSED_QRCODE_BTN);
    setShowScanQrCodeModal(true);
  };
  const handleLogout = () => {
    alertBox(localize('common.logout'), localize('common.wantToLogout'), {
      positiveText: localize('common.logout'),
      negativeText: localize('common.cancel'),
      onPositiveClick: () => {
        setIsPressedLogout(true);
        trackEvent(EVENT_NAME.PRESSED_LOGOUT);
        dispatch(doLogout.trigger());
      }
    });
  };

  const getManger = (type) => {
    const managerObj = managers?.find((item) => item.managerType === type);
    return managerObj?.firstName || managerObj?.lastName
      ? `${managerObj.firstName} ${managerObj.lastName}`
      : '-';
  };

  const pleaseEnableBiometric = () => {
    rnBiometrics
      .simplePrompt({ promptMessage: localize('biometric.confirmFingerPrint') })
      .then((resultObject) => {
        const { success } = resultObject;
        console.log('handleEnadleBiometric', resultObject);
        if (success) {
          console.log('successful biometrics provided');
          storeData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE, true);
          setBiometricSwitch(true);
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  };

  const onBiometricEnableHandler = (value: boolean) => {
    if (value) {
      pleaseEnableBiometric();
    } else {
      alertBox(localize('profile.biometric'), localize('profile.areSureWantRemove'), {
        positiveText: localize('common.yes'),
        negativeText: localize('common.no'),
        onPositiveClick: () => {
          removeData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE).then(() => {
            setBiometricSwitch(false);
            // setBiometricPopup(false);
          });
        },
        cancelable: true
      });
    }
  };

  const gotoOrganisation = () => {
    navigation.navigate(NavigationRouteNames.ORGANISATION as never);
  };

  const iconSection = (
    <TouchableOpacity
      onPress={gotoOrganisation}
      style={{ paddingLeft: RfW(5), paddingVertical: RfH(5) }}>
      <CustomImage
        image={Images.organisationTreeIcon}
        imageHeight={RfW(20)}
        imageWidth={RfW(20)}
        imageResizeMode={'contain'}
        tintColor={isDarkMode ? Colors.white : Colors.white}
        submitFunction={gotoOrganisation}
      />
    </TouchableOpacity>
  );

  const renderOCAContainer = () => (
    <View style={styles.ocaView}>
      <IconButtonWrapper
        iconImage={Images.clientLogoWhite}
        iconHeight={RfH(25.37)}
        iconWidth={RfW(63)}
        imageResizeMode={'contain'}
        containerStyling={{ paddingTop: RfH(Platform.OS === 'ios' ? 15 : 0) }}
      />
      <View
        style={{
          marginTop: RfH(28),
          flexDirection: 'row'
        }}>
        <EditProfileImage cenomiBorderColor={Colors.white} />
        <View style={{ flex: 1, marginLeft: RfW(20) }}>
          <CustomText
            fontSize={16}
            color={Colors.white}
            styling={{
              lineHeight: RfH(20),
              marginTop: RfH(2),
              ...CommonStyles.regularFont500Style
            }}>
            {displayName || '-'}
          </CustomText>
          <CustomText
            fontSize={12}
            color={Colors.white}
            styling={{
              lineHeight: RfH(20),
              ...CommonStyles.regularFont400Style
            }}>
            {assignmentName || '-'}
          </CustomText>
          <CustomText
            fontSize={12}
            color={Colors.white}
            styling={{
              lineHeight: RfH(20),
              ...CommonStyles.regularFont400Style
            }}>
            {`${departmentName} Cenomi Centers`}
          </CustomText>
          <CustomText
            fontSize={12}
            color={Colors.white}
            styling={{
              lineHeight: RfH(20),
              ...CommonStyles.regularFont400Style
            }}>
            {legalEmployerName || '-'}
          </CustomText>
          <CustomText
            fontSize={12}
            color={Colors.white}
            styling={{
              lineHeight: RfH(20),
              ...CommonStyles.regularFont400Style
            }}>
            {`${localize('profile.location')}: ${locationDetails?.TownOrCity || '-'}`}
          </CustomText>
        </View>
      </View>

      {/* userDetail */}

      <View
        style={{
          marginBottom: RfH(2),
          marginTop: RfH(9)
        }}>
        {renderUserDetailsContainer({
          leftLable: localize('profile.dateOfJoining'),
          leftValue: joiningDate ? `${moment(joiningDate).format('DD/MM/YYYY')}` : '-',
          rightLable: localize('profile.EmployeeID'),
          rightValue: employeeId || '-'
        })}
        {renderUserDetailsContainer({
          leftLable: localize('profile.employeeGrade'),
          leftValue: gradeCode ? `${localize('common.grade')} ${gradeCode}` : '-',
          rightLable: localize('profile.lineManager'),
          rightValue: getManger(LINE_MANAGER)
        })}
        {renderEmailDetailsContainer({
          leftLable: localize('login.email'),
          leftValue: userDetail.username
        })}

        {renderUserDetailsContainer({
          leftLable: localize('profile.mobileNumber'),
          leftValue: getWorkHomeMobilePhoneNumber(phones),
          rightLable: localize('profile.workPhone'),
          rightValue: getPhoneNumBytype(PHONE_W1, phones)
        })}
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: RfH(21),
          marginBottom: RfH(2),
          justifyContent: 'space-between'
        }}>
        <TouchableOpacity style={styles.share_container} onPress={handleOnShare}>
          <IconButtonWrapper
            iconImage={Images.shareWhite}
            iconWidth={RfH(14)}
            iconHeight={RfH(12)}
            imageResizeMode={'contain'}
          />
          <CustomText
            fontSize={14}
            color={Colors.white}
            styling={{
              marginLeft: RfW(6),
              ...CommonStyles.regularFont500Style
            }}>
            {localize('common.share')}
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleQrCode} style={styles.share_container}>
          <IconButtonWrapper
            iconImage={Images.QR_code}
            iconWidth={RfH(12)}
            iconHeight={RfH(12)}
            imageResizeMode={'contain'}
          />
          <CustomText
            fontSize={14}
            color={Colors.white}
            styling={{
              marginLeft: RfW(6),
              ...CommonStyles.regularFont500Style
            }}>
            {localize('profile.qrCode')}
          </CustomText>
        </TouchableOpacity>
      </View>

      <CustomText
        fontSize={12}
        color={Colors.white}
        styling={{
          lineHeight: RfH(20),
          marginTop: RfH(15),
          paddingBottom: RfH(Platform.OS === 'ios' ? 0 : 0),
          textAlign: 'center',
          ...CommonStyles.regularFont400Style
        }}>
        {userDetail?.organization?.website}
      </CustomText>
    </View>
  );

  const renderUserDetailsContainer = (rowData) => (
    <View
      style={{
        flexDirection: 'row',
        marginTop: RfH(20),
        marginBottom: RfH(2),
        justifyContent: 'space-between'
      }}>
      <View style={{ width: '50%' }}>
        <CustomText
          fontSize={12}
          color={Colors.white}
          styling={{
            lineHeight: RfH(14.4),
            ...CommonStyles.regularFont500Style
          }}>
          {rowData.leftLable}
        </CustomText>
        <CustomText
          fontSize={14}
          color={Colors.white}
          styling={{
            lineHeight: RfH(20),
            marginTop: RfH(3),
            ...CommonStyles.regularFont400Style
          }}>
          {rowData.leftValue}
        </CustomText>
      </View>
      <View style={{ width: '50%', flexDirection: 'row' }}>
        <View>
          <CustomText
            fontSize={12}
            color={Colors.white}
            styling={{
              lineHeight: RfH(14.4),
              ...CommonStyles.regularFont500Style
            }}>
            {rowData.rightLable}
          </CustomText>
          <CustomText
            fontSize={14}
            color={Colors.white}
            styling={{
              lineHeight: RfH(20),
              marginTop: RfH(3),
              ...CommonStyles.regularFont400Style
            }}>
            {rowData.rightValue}
          </CustomText>
        </View>
      </View>
    </View>
  );
  const renderEmailDetailsContainer = (rowData) => (
    <View
      style={{
        flexDirection: 'row',
        marginTop: RfH(20),
        marginBottom: RfH(2),
        justifyContent: 'space-between'
      }}>
      <View style={{ width: '100%' }}>
        <CustomText
          fontSize={12}
          color={Colors.white}
          styling={{
            lineHeight: RfH(14.4),
            ...CommonStyles.regularFont500Style
          }}>
          {rowData.leftLable}
        </CustomText>
        <CustomText
          fontSize={14}
          color={Colors.white}
          styling={{
            lineHeight: RfH(20),
            marginTop: RfH(3),
            ...CommonStyles.regularFont400Style
          }}>
          {rowData.leftValue}
        </CustomText>
      </View>
    </View>
  );
  const onClickItems = (routesName) => {
    if (routesName === '-') {
      return '-';
    }

    if (routesName === 'termsAndCondition') {
      trackEvent(EVENT_NAME.PRESSED_TERMS_AND_CONDITIONS_FROM_PROFILE);
      setWebViewModalInfo({
        isVisible: true,
        // url: publicStaticData?.termsUrl,
        url: Config.TERMS_AND_CONDITION || '',
        title: localize('common.termsandConditions')
      });

      setIsWebViewLoading(true);
    } else if (routesName === 'privacyPolicy') {
      trackEvent(EVENT_NAME.PRESSED_PRIVACY_POLICY_FROM_PROFILE);
      setWebViewModalInfo({
        isVisible: true,
        // url: publicStaticData?.privacyUrl,
        url: Config.PRIVACY_POLICY || '',
        title: localize('common.privacyPolicy')
      });

      setIsWebViewLoading(true);
    } else {
      if (routesName === NavigationRouteNames.FAQ) {
        trackEvent(EVENT_NAME.PRESSED_FAQ_FROM_PROFILE);
      }
      if (routesName === NavigationRouteNames.APPSSETTINGS) {
        trackEvent(EVENT_NAME.PRESSED_APPS_SETTINGS_FROM_PROFILE);
      }
      navigation.navigate(routesName as never);
    }
  };

  const rightIconSection = (element) => {
    return element.ArrowListingicon;
  };

  const renderCard = () => (
    <ScrollView
      overScrollMode={'never'}
      showsVerticalScrollIndicator={false}
      style={{ marginHorizontal: RfW(24) }}>
      <View
        style={{
          flex: 1,
          marginTop: RfH(15)
        }}>
        {/* <ImageBackground
          style={{
            width: '100%',
            overflow: 'hidden'
          }}
          source={Images.profileCardBg}
          resizeMode={'cover'}
          imageStyle={{
            // borderRadius: RfH(12),
            width: deviceWidth(),
            overflow: 'hidden',
            left: -RfW(24)
          }}>
          {renderOCAContainer()}
        </ImageBackground> */}
        <View
          style={{
            backgroundColor: getColorWithOpacity(Colors.midnightExpress, 0.37),
            borderRadius: BorderRadius.BR15
          }}>
          {renderOCAContainer()}
        </View>
        {!isEmpty(qrCodeData) && (
          <View
            style={{
              alignItems: 'center',
              marginTop: RfH(15)
            }}>
            {profileMenus.map((element, index) => {
              return (
                <MenuListComponent
                  element={element}
                  isSensorAvailable={isSensorAvailable}
                  biometricSwitch={biometricSwitch}
                  onBiometricEnableHandler={onBiometricEnableHandler}
                  onClickItems={onClickItems}
                />
              );
            })}
          </View>
        )}
        <View style={{ paddingTop: RfH(40) }}>{renderLogoutRow()}</View>
      </View>
    </ScrollView>
  );
  const renderLogoutRow = () => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: RfH(20)
      }}>
      <TouchableOpacity
        activeOpacity={0.4}
        style={{
          backgroundColor: Colors.darkPurple,
          paddingHorizontal: RfW(17),
          paddingVertical: RfH(7),
          borderRadius: RfW(4)
        }}
        onPress={() => {
          handleLogout();
        }}>
        <CustomText
          fontSize={16}
          color={Colors.white}
          styling={{ ...CommonStyles.regularFont500Style }}>
          {localize('profile.logout')}
        </CustomText>
      </TouchableOpacity>
      <CustomText
        fontSize={14}
        color={isDarkMode ? Colors.white : getColorWithOpacity(Colors.white, 0.6)}
        styling={CommonStyles.regularFont400Style}>
        {/* {localize('profile.app_ver') + ' ' + APP_VERSION} */}
        {`v${APP_VERSION} (${BUILD_NUMBER})`}
      </CustomText>
    </View>
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
            flex: 1,
            // paddingTop: RfH(10),
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
          }}>
          <HeaderSVG
            isRightButtonVisible={true}
            isBackButtonVisible={true}
            titleText={localize('profile.profile')}
            titleFont={20}
            rightIcon={iconSection}
            onRightButtonClickHandler={() => {}}
            onBackPressHandler={() => navigation.goBack()}
            // isRight2BtnVisible={true}
            onRight2BtnClick={() => {}}
          />
          {!isEmpty(userDetail) ? renderCard() : <></>}
        </View>
        {showScanQrCodeModal && (
          <ScanQrCodeModal
            isDarkMode={isDarkMode}
            isVisible={showScanQrCodeModal}
            openModal={() => setShowScanQrCodeModal(false)}
            qrCodeData={qrCodeData}
            title={localize('profile.scanQrCode')}
            onClick={() => {
              setShowScanQrCodeModal(false);
            }}
          />
        )}

        {webViewModalInfo?.isVisible && (
          <CustomModalWebView
            isDarkMode={isDarkMode}
            headerText={webViewModalInfo?.title}
            rightButtonVisible={true}
            backButtonHandler={() => setWebViewModalInfo({ isVisible: false, url: '', title: '' })}
            onLoadComplete={() => setIsWebViewLoading(false)}
            modalVisible={webViewModalInfo?.isVisible}
            url={webViewModalInfo?.url}
            showLoader={isWebViewLoading}
          />
        )}
      </SafeAreaView>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },

  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  ocaView: {
    // paddingLeft: RfW(16),
    // paddingVertical: RfH(16),
    // paddingRight: RfW(12),
    padding: RfW(15)
  },
  updatePictureView: {
    position: 'absolute',
    right: RfH(-10),
    bottom: RfH(-10),
    padding: RfH(10)
  },
  rowContainer: {
    backgroundColor: Colors.white,
    height: RfH(64),
    flexDirection: 'row',
    flex: 1,
    borderRadius: BorderRadius.BR0,
    marginVertical: RfH(6),
    marginHorizontal: RfH(2),
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: RfW(16),
    paddingLeft: RfW(8)
  },
  share_container: {
    width: '48%',
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: BorderRadius.BR0,
    alignItems: 'center',
    justifyContent: 'center',
    height: RfH(41),
    flexDirection: 'row'
  },
  iconbg: {
    // backgroundColor: Colors.voiletLight,
    height: RfH(48),
    width: RfW(48),
    flexDirection: 'row',
    borderRadius: BorderRadius.BR0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Profile;
