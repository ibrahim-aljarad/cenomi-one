import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { CustomImage, CustomText, Loader, LoaderSmall } from '../../../../components';
import { Colors, CommonStyles, Images } from '../../../../theme';
import { RfH, RfW } from '../../../../utils/helper';
import { createStructuredSelector } from 'reselect';
import {
  isProfileImageUpdatedSelector,
  profileImageTimestampSelector
} from '../../../Profile/redux/selectors';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/core';
import { getProfilePicInfo, getSaveData, isValidImageUrl } from '../../../../utils/helpers';
import { LOCAL_STORAGE_DATA_KEY } from '../../../../utils/constants';
import Config from '../../../../utils/config';
import { getMyProfileDetailsSelector } from '../../../LoginHome/redux/selectors';
import { LOTTIE_JSON_FILES } from '../../../../constant';
import {
  isRewardsProfileImageUpdatedSelector,
  rewardProfileImageTimestampSelector
} from '../../../RewardsHome/RewardsProfile/redux/selectors';

const stateSelector = createStructuredSelector({
  myProfileData: getMyProfileDetailsSelector,
  isProfileImageUpdated: isProfileImageUpdatedSelector,
  profileImageTimestamp: profileImageTimestampSelector,
  isRewardProfileImageUpdated: isRewardsProfileImageUpdatedSelector,
  rewardProfileImageTimestamp: rewardProfileImageTimestampSelector
});

const ProfileImageSection = (props: any) => {
  const {
    imageSize,
    imageBorderRadius,
    labelFontSize,
    passedProfileData = null,
    isForRewards = false
  } = props || {};

  const {
    isProfileImageUpdated,
    myProfileData,
    profileImageTimestamp,
    isRewardProfileImageUpdated,
    rewardProfileImageTimestamp
  } = useSelector(stateSelector);
  const [imagePath, setImagePath] = useState('');
  const [isCorrectUrl, setIsCorrectUrl] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const isFocused = useIsFocused();
  const { profileText } =
    getProfilePicInfo(passedProfileData ? passedProfileData : myProfileData?.profile) || {};

  useEffect(() => {
    if (isFocused) {
      if (passedProfileData) {
        if (passedProfileData?.photo) {
          setImagePath(passedProfileData?.photo || '');
          setIsCorrectUrl(true);
        } else {
          setIsCorrectUrl(false);
        }
      } else {
        getSaveData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN).then((token) => {
          const url = `${Config.API_BASE_URL}user/profile-image?token=${token}&t=${
            isForRewards ? rewardProfileImageTimestamp : profileImageTimestamp
          }`;
          setImagePath(url);

          fetch(url)
            .then((res) => {
              if (res.status === 404) {
                setIsCorrectUrl(false);
              } else {
                setIsCorrectUrl(true);
              }
            })
            .catch((err) => {
              setIsCorrectUrl(false);
            });
        });
      }
    }
  }, [
    isProfileImageUpdated,
    isFocused,
    profileImageTimestamp,
    passedProfileData,
    isRewardProfileImageUpdated,
    rewardProfileImageTimestamp
  ]);

  useEffect(() => {
    if ((imagePath && isCorrectUrl) || isCorrectUrl === false) {
      setIsLoading(false);
    }
  }, [imagePath && isCorrectUrl]);

  if (imagePath && isCorrectUrl) {
    return (
      <CustomImage
        image={imagePath || Images.placeholderProfile}
        placeHolderImage={Images.placeholderProfile}
        imageWidth={imageSize || RfH(40)}
        imageHeight={imageSize || RfH(40)}
        imageResizeMode={'cover'}
        styling={{
          borderRadius: imageBorderRadius || (imageSize || RfH(40)) / 2,
          backgroundColor: Colors.white,
          overflow: 'hidden'
        }}
      />
    );
  }

  return (
    <View
      style={{
        height: imageSize || RfH(40),
        width: imageSize || RfH(40),
        borderRadius: imageBorderRadius || (imageSize || RfH(40)) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.profileIconBG
      }}>
      {isCorrectUrl === false ? (
        <CustomText
          fontSize={labelFontSize || 18}
          fontWeight={'bold'}
          styling={{
            ...CommonStyles.regularFont600Style,
            paddingTop: RfH(2),
            color: Colors.primary
          }}>
          {profileText || ''}
        </CustomText>
      ) : isLoading ? (
        <LoaderSmall customSource={LOTTIE_JSON_FILES.loaderJson} isLoading={isLoading} />
      ) : null}
    </View>
  );
};

export default memo(ProfileImageSection);
