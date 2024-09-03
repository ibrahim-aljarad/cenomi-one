import { TouchableOpacity, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomImage from '../CustomImage';
import { Colors, HEIGHT, WIDTH } from '../../theme';
import styles from './style';
import { createStructuredSelector } from 'reselect';
import { getFeatureModuleDataSelector } from '../../containers/Home/redux/selectors';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { EVENT_NAME, trackEvent } from '../../utils/analytics';
import { localize } from '../../locale/utils';
import CustomPopupModal from '../CustomPopupModal';
import { getFeatueModuleDataInfo } from '../../utils/helpers';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { CONFIG_CONSTANT } from '../../utils/constants';

type FloatingButtonProps = {
  image: number | string;
  buttonOnClick?: () => void;
  styling?: ViewStyle;
};

const stateSelector = createStructuredSelector({
  featureModuleData: getFeatureModuleDataSelector,
  isDarkMode: isDarkModeSelector
});

const FloatingButton = ({ image, buttonOnClick, styling }: FloatingButtonProps) => {
  const { featureModuleData, isDarkMode } = useSelector(stateSelector);
  const [isShow, setIsShow] = useState(false);
  const [isLiveGPT, setIsLiveGPT] = useState(false);
  const [isShowComingSoonModal, setisShowComingSoonModal] = useState(false);

  useEffect(() => {
    if (!isEmpty(featureModuleData) && featureModuleData?.length > 0) {
      const info = getFeatueModuleDataInfo(featureModuleData, CONFIG_CONSTANT?.CHAT_GPT);
      setIsShow(info?.isActive || false);
      setIsLiveGPT(info?.isLive || false);
    }
  }, [featureModuleData]);

  const onPress = () => {
    trackEvent(EVENT_NAME.CHAT_GPT);
    if (isLiveGPT) {
      buttonOnClick && buttonOnClick();
    } else {
      setisShowComingSoonModal(true);
    }
  };

  if (isShow) {
    return (
      <>
        <TouchableOpacity
          style={[
            styles.container,
            {
              backgroundColor: isDarkMode ? Colors.darkModeDisabledColor : Colors.app_black,
              ...styling
            }
          ]}
          onPress={onPress}>
          <CustomImage
            image={image}
            tintColor={Colors.white}
            imageHeight={HEIGHT.H20}
            imageWidth={WIDTH.W20}
          />
        </TouchableOpacity>
        {isShowComingSoonModal && (
          <CustomPopupModal
            isVisible={isShowComingSoonModal}
            messageInfo={{ title: localize('common.ComingSoon'), description: '' }}
            pressedPopupButton={() => setisShowComingSoonModal(false)}
            buttonText={localize('common.okay')}
          />
        )}
      </>
    );
  }

  return null;
};

export default FloatingButton;
