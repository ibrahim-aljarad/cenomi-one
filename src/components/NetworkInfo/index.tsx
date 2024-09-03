import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import { CustomText, IconButtonWrapper } from '..';
import { localize } from '../../locale/utils';
import { Colors, CommonStyles, Images, WIDTH } from '../../theme';
import { RfH } from '../../utils/helpers';
import AppPrimaryButton from '../AppPrimaryButton';
import styles from './style';
import WrapperContainer from '../WrapperContainer';

function NetworkInfo(props) {
  const { netInfo, headerText, subText, btnText, handleRequest } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!netInfo) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
    return setShow(false);
  }, [netInfo]);

  return (
    <>
      {!netInfo && show && (
        <Modal visible={true} transparent={false} animationType={'slide'}>
          <WrapperContainer>
            <View style={styles.container}>
              <View style={styles.noBookingView}>
                <IconButtonWrapper
                  iconImage={Images.noNetwork}
                  iconHeight={WIDTH.W60}
                  iconWidth={WIDTH.W60}
                />
                <CustomText
                  fontSize={20}
                  color={Colors.white}
                  styling={{
                    paddingTop: RfH(20),
                    lineHeight: 30,
                    ...CommonStyles.regularFont500Style
                  }}>
                  {localize(headerText)}
                </CustomText>
                <CustomText
                  fontSize={14}
                  color={Colors.white}
                  styling={{
                    paddingTop: RfH(20),
                    lineHeight: 20,
                    textAlign: 'center',
                    ...CommonStyles.regularFont400Style
                  }}>
                  {localize(subText)}
                </CustomText>
              </View>
              <View style={styles.bottomBtnContainer}>
                <AppPrimaryButton
                  buttonText={localize(btnText).toUpperCase()}
                  onPress={handleRequest}
                />
              </View>
            </View>
          </WrapperContainer>
        </Modal>
      )}
    </>
  );
}

NetworkInfo.propTypes = {
  netInfo: PropTypes.bool,
  seconds: PropTypes.number,
  headerText: PropTypes.string,
  subText: PropTypes.string,
  btnText: PropTypes.string,
  handleRequest: PropTypes.func
};

NetworkInfo.defaultProps = {
  netInfo: false,
  headerText: 'common.InternetDown',
  subText: 'common.InternetMessage',
  btnText: 'common.tryAgain',
  seconds: 0,
  handleRequest: null
};

export default NetworkInfo;
