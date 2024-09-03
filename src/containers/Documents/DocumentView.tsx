import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { isEmpty } from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Pdf from 'react-native-pdf';
import { Shadow } from 'react-native-shadow-2';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText, HeaderSVG, Loader } from '../../components';
import AppPrimaryButton from '../../components/AppPrimaryButton';
import CustomModal from '../../components/CustomModal';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constant';
import { Colors, CommonStyles, Images } from '../../theme';
import { CONFIG_CONSTANT } from '../../utils/constants';
import { RfH, RfW, getImageUrl } from '../../utils/helper';
import { getDocumentsDetail, submitAcknowledge } from '../Home/redux/actions';
import { getAcknowledgeDataSelector, getDocumentsDetailsSelector } from '../Home/redux/selectors';
import { isDarkModeSelector } from '../redux/selectors';
import { getIsApiExecutingSelector } from '../../appContainer/redux/selectors';
import { localize } from '../../locale/utils';
import WrapperContainer from '../../components/WrapperContainer';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  acknowledgeData: getAcknowledgeDataSelector,
  documentDetailsData: getDocumentsDetailsSelector,
  isAPIExecuting: getIsApiExecutingSelector
});

const DocumentView = (props: any) => {
  const { id } = props?.route?.params || {};

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isDarkMode, acknowledgeData, documentDetailsData, isAPIExecuting } =
    useSelector(stateSelector);

  const [isCheckedAcknowledge, setIsCheckedAcknowledge] = useState(false);
  const [isMoalVisible, setIsModalVisible] = useState(false);
  const [isSuccessSubmitAcknowledge, setIsSuccessSubmitAcknowledge] = useState(false);
  const [signatureText, setSignatureText] = useState('');
  const [isFileLoader, setIsFileLoader] = useState(false);
  const [isApiTriggered, setIsApiTriggered] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getDocumentsDetail.trigger({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (!isEmpty(acknowledgeData) && isApiTriggered) {
      setIsApiTriggered(false);
      setIsSuccessSubmitAcknowledge(true);
    }
  }, [acknowledgeData]);

  const onPressSubmit = () => {
    if (isCheckedAcknowledge) {
      setIsApiTriggered(true);
      const data = {
        featureId: documentDetailsData?.id,
        featureModule: CONFIG_CONSTANT?.DOCUMENTS,
        metadata: {}
      };
      dispatch(submitAcknowledge.trigger({ data }));

      // setIsSuccessSubmitAcknowledge(true);
    } else {
      setIsModalVisible(true);
    }
  };

  const onRequestCloseModal = () => setIsModalVisible(!isMoalVisible);

  const rightIconItem = (
    <CustomImage
      image={Images.crossBlack}
      imageWidth={RfH(16)}
      imageHeight={RfH(16)}
      tintColor={isDarkMode ? Colors.white : Colors.app_black}
    />
  );

  const mainSection = () => {
    return (
      <>
        <View style={styles.documentContainer}>
          <Pdf
            trustAllCerts={false}
            source={{
              uri: getImageUrl(documentDetailsData?.document?.url),
              headers: {},
              cache: true
              // headers: documentInfo?.headers
            }}
            onLoadComplete={(numberOfPages, path) => {
              setIsFileLoader(false);
            }}
            onLoadProgress={() => setIsFileLoader(true)}
            onError={(error) => {
              // console.log('error==========>', error);
              setIsFileLoader(false);
            }}
            // style={[styles.pdf, { paddingBottom: RfH(Platform.OS === 'ios' ? 50 : 80) }]}
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              backgroundColor: Colors.transparent,
              paddingTop: RfH(10)
            }}
          />
          <Loader isLoading={isAPIExecuting || isFileLoader} />
        </View>
        {documentDetailsData?.isAcknowledged === false ? (
          <View
            style={{
              justifyContent: 'flex-end',
              paddingHorizontal: RfW(24),
              paddingTop: RfH(24),
              paddingBottom: RfH(Platform.OS === 'ios' ? 5 : 34),
              backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent,
              borderTopWidth: RfH(1),
              borderTopColor: Colors.white
            }}>
            <TouchableOpacity
              onPress={() => setIsCheckedAcknowledge(!isCheckedAcknowledge)}
              style={{ flexDirection: 'row', marginBottom: RfH(10) }}>
              <CustomImage
                image={
                  isCheckedAcknowledge
                    ? Images.checkboxSelect
                    : isDarkMode
                    ? Images.checkboxPrimaryInactiveWhite
                    : Images.checkboxDeselect
                }
                imageHeight={RfH(20)}
                imageWidth={RfH(20)}
                styling={{ top: RfH(5) }}
              />
              <CustomText
                fontSize={14}
                color={Colors.white}
                styling={{
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(20),
                  paddingLeft: RfW(10),
                  paddingRight: RfW(10),
                  flex: 1
                }}>{`${localize('documents.acknowlegeAcceptationMsg')}`}</CustomText>
            </TouchableOpacity>

            <AppPrimaryButton
              onPress={onPressSubmit}
              buttonText={`${localize('common.submitC')}`}
            />
          </View>
        ) : null}
      </>
    );
  };

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
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
          }}>
          <HeaderSVG
            isBackButtonVisible={true}
            titleText={documentDetailsData?.name || ''}
            titleFont={20}
            onBackPressHandler={() => {
              navigation.goBack();
            }}
          />
          {mainSection()}
        </View>

        <CustomModal modalVisible={isMoalVisible} onRequestClose={onRequestCloseModal}>
          <>
            <CustomText
              fontSize={14}
              color={Colors.white}
              styling={{
                ...CommonStyles.regularFont400Style,
                lineHeight: RfH(22),
                paddingHorizontal: RfW(30),
                paddingTop: RfH(28),
                textAlign: 'center'
              }}>
              {`${localize('documents.plzCheckTheAcknowledgeBox')}`}
            </CustomText>

            <View style={{ marginTop: RfH(15), width: '100%' }}>
              <AppPrimaryButton
                buttonText={`${localize('common.okay')}`}
                onPress={onRequestCloseModal}
              />
            </View>
          </>
        </CustomModal>

        {isSuccessSubmitAcknowledge ? (
          <CustomModal
            title={`${localize('common.submittedSuccessfully')}`}
            modalVisible={isSuccessSubmitAcknowledge}
            onRequestClose={() => setIsSuccessSubmitAcknowledge(false)}
            onRequestActionButton={() => {
              setIsSuccessSubmitAcknowledge(false);
              navigation.goBack();
            }}
          />
        ) : null}
      </SafeAreaView>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  documentContainer: {
    flex: 1,
    backgroundColor: Colors.transparent,
    minHeight: SCREEN_HEIGHT - RfH(400),
    borderRadius: RfW(6)
  },
  textInputSty: {
    fontSize: 14,
    color: Colors.app_black,
    ...CommonStyles.regularFont400Style
  }
});

export default DocumentView;
