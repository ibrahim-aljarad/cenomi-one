import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText, IconButtonWrapper } from '../../../components';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import CustomModal from '../../../components/CustomModal';
import ImageSpecificationUploadModal from '../../../components/ImageSpecificationUpload';
import UploadDocument from '../../../components/UploadDocument';
import { localize } from '../../../locale/utils';
import { Colors, CommonStyles, Images } from '../../../theme';
import { EVENT_NAME, trackEvent } from '../../../utils/analytics';
import { RfH, RfW } from '../../../utils/helper';
import { profileImageUpdate, profileImageUpdateFlag } from '../redux/actions';
import { isProfileImageUpdatedSelector } from '../redux/selectors';
import { fetchspecificationUploadList } from '../serializer';
import ProfileImageSection from '../../Home/components/ProfileImageSection';

const stateSelector = createStructuredSelector({
  isProfileImageUpdated: isProfileImageUpdatedSelector
});

const EditProfileImage = (props: any) => {
  const {
    isHideEditOption = false,
    imageSize,
    cenomiBorderColor = Colors.darkPurple
  } = props || {};
  const { isProfileImageUpdated } = useSelector(stateSelector);
  const [imageSpecificationUploadModal, setImageSpecificationUploadModal] = useState(false);
  const [isShowImagePickerModal, setIsShowImagePickerModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isProfileImageUpdated) {
      dispatch(profileImageUpdateFlag.trigger(false));
      setShowSuccessPopup(true);
    }
  }, [isProfileImageUpdated]);

  const handleImage = () => {
    trackEvent(EVENT_NAME.PRESSED_UPLOAD_ON_PROFILE_PIC);
    setImageSpecificationUploadModal(true);
  };

  return (
    <View>
      <View style={{ borderRadius: RfH(90 / 2), marginLeft: RfW(10), marginTop: RfH(13) }}>
        <ProfileImageSection
          imageSize={imageSize || RfH(75)}
          imageBorderRadius={RfH(0.2)}
          labelFontSize={30}
        />
        <CustomImage
          image={Images.cenomiBorder}
          imageHeight={RfH(90)}
          imageWidth={RfH(90)}
          styling={{ position: 'absolute', top: -RfH(82), left: -RfW(7) }}
          tintColor={cenomiBorderColor}
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
          setIsShowImagePickerModal(false);
          if (!isEmpty(data)) {
            // const data = {
            //   imageBase64: base64Data,
            // };
            dispatch(profileImageUpdate.trigger({ data }));
          }
        }}
        isAvatarVisible={true}
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
    bottom: RfH(0),
    right: RfH(0)
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
