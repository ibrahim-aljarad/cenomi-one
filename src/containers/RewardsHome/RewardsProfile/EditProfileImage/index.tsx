import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText, IconButtonWrapper } from '../../../../components';
import AppPrimaryButton from '../../../../components/AppPrimaryButton';
import CustomModal from '../../../../components/CustomModal';
import ImageSpecificationUploadModal from '../../../../components/ImageSpecificationUpload';
import UploadDocument from '../../../../components/UploadDocument';
import { localize } from '../../../../locale/utils';
import { Colors, CommonStyles, Images } from '../../../../theme';
import { EVENT_NAME, trackEvent } from '../../../../utils/analytics';
import { RfH, RfW } from '../../../../utils/helper';
import { getMyProfileDetailsSelector } from '../../../LoginHome/redux/selectors';
import { rewardsProfileImageUpdate, rewardsProfileImageUpdateFlag } from '../redux/actions';
import { isRewardsProfileImageUpdatedSelector } from '../redux/selectors';
import { fetchspecificationUploadList } from '../serializer';
import { getProfilePicInfo, getSaveData } from '../../../../utils/helpers';
import Config from '../../../../utils/config';
import { LOCAL_STORAGE_DATA_KEY } from '../../../../utils/constants';
import ProfileImageSection from '../../../Home/components/ProfileImageSection';

const stateSelector = createStructuredSelector({
  myProfileData: getMyProfileDetailsSelector,
  isRewardsProfileImageUpdated: isRewardsProfileImageUpdatedSelector
});

const EditProfileImage = (props: any) => {
  const { isHideEditOption = false } = props || {};
  const { myProfileData, isRewardsProfileImageUpdated } = useSelector(stateSelector);
  const [userDetail, setUserDetail] = useState(myProfileData);
  const [imageSpecificationUploadModal, setImageSpecificationUploadModal] = useState(false);
  const [isShowImagePickerModal, setIsShowImagePickerModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const dispatch = useDispatch();

  const { profileText } = getProfilePicInfo(userDetail?.profile) || {};

  useEffect(() => {
    if (!isEmpty(myProfileData)) {
      setUserDetail(myProfileData);
    }
  }, [myProfileData]);

  useEffect(() => {
    if (isRewardsProfileImageUpdated) {
      dispatch(rewardsProfileImageUpdateFlag.trigger(false));
      setShowSuccessPopup(true);
    }
  }, [isRewardsProfileImageUpdated]);

  const handleImage = () => {
    trackEvent(EVENT_NAME.PRESSED_UPLOAD_ON_PROFILE_PIC);
    setImageSpecificationUploadModal(true);
  };

  const [imagePath, setImagePath] = useState('');
  useEffect(() => {
    getSaveData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN).then((token) =>
      setImagePath(`${Config.API_BASE_URL}user/profile-image?token=${token}`)
    );
  }, []);

  return (
    <View>
      <View style={{ borderRadius: RfH(90 / 2) }}>
        <ProfileImageSection imageSize={RfH(75)} labelFontSize={30} imageBorderRadius={RfH(0.2)} />
        <CustomImage
          image={Images.cenomiBorder}
          imageHeight={RfH(90)}
          imageWidth={RfH(90)}
          styling={{ position: 'absolute', top: -RfH(82), left: -RfW(7) }}
          tintColor={Colors.white}
        />
        {!isHideEditOption ? (
          <View style={styles.updatePictureView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.cameraContainer}
              onPress={handleImage}>
              <IconButtonWrapper
                iconImage={Images.ProfilePhotoCamera}
                iconWidth={RfW(18)}
                iconHeight={RfW(18)}
                imageResizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      {imageSpecificationUploadModal && (
        <ImageSpecificationUploadModal
          isVisible={imageSpecificationUploadModal}
          openModal={() => setImageSpecificationUploadModal(false)}
          module={fetchspecificationUploadList()}
          onClick={() => {
            setImageSpecificationUploadModal(false);
            setIsShowImagePickerModal(true);
          }}
        />
      )}

      <UploadDocument
        isVisible={isShowImagePickerModal}
        isFilePickerVisible={false}
        handleClose={() => setIsShowImagePickerModal(false)}
        isUploadFileOnServer={true}
        handleUpload={(data) => {
          if (!isEmpty(data)) {
            // const data = {
            //   imageBase64: base64Data,
            // };
            dispatch(rewardsProfileImageUpdate.trigger({ data }));
          }

          setIsShowImagePickerModal(false);
        }}
      />

      <CustomModal
        modalVisible={showSuccessPopup}
        onRequestClose={() => setShowSuccessPopup(false)}>
        <>
          <CustomImage
            image={Images.successTick}
            imageWidth={60}
            imageHeight={60}
            imageResizeMode={'contain'}
            displayLoader={false}
            containerStyling={{ paddingVertical: RfH(25) }}
          />
          <CustomText
            fontSize={20}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(22),
              top: -RfH(10)
            }}>
            {localize('profile.profilePhotoUpdatedSucsfuly')}
          </CustomText>
          <CustomText
            fontSize={14}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(22),
              paddingHorizontal: RfW(40),
              textAlign: 'center'
            }}>
            {localize('profile.photoUpdatedSucsfulySubText')}
          </CustomText>

          <View style={{ marginTop: RfH(22), width: '100%' }}>
            <AppPrimaryButton
              buttonText={localize('common.done').toUpperCase()}
              onPress={() => setShowSuccessPopup(false)}
            />
          </View>
        </>
      </CustomModal>
    </View>
  );
};

export default EditProfileImage;

const styles = StyleSheet.create({
  updatePictureView: {
    position: 'absolute',
    right: RfH(-10),
    bottom: RfH(-10),
    padding: RfH(10)
  },
  cameraContainer: {
    height: RfW(23),
    width: RfW(23),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999
  }
});
