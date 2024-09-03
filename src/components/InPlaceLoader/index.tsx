import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, HEIGHT } from '../../theme';
import styles from './styles';
import LottieView from 'lottie-react-native';
import { LOTTIE_JSON_FILES } from '../../constant';
import { localize } from '../../locale/utils';

function InPlaceLoader(props) {
  const { isLoading } = props;
  return (
    <>
      {isLoading ? (
        <View style={[styles.modalBackground, { backgroundColor: Colors.lightGrey219 }]}>
          <LottieView
            style={{
              height: HEIGHT.H80,
              width: HEIGHT.H80,
              alignSelf: 'center'
            }}
            source={LOTTIE_JSON_FILES.loaderJson}
            resizeMode="contain"
            loop={true}
            autoPlay
          />
        </View>
      ) : null}
    </>
  );
}

InPlaceLoader.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.string
};

InPlaceLoader.defaultProps = {
  isLoading: false,
  text: localize('components.pleaseWait')
};

export default InPlaceLoader;
