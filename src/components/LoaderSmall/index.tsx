import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import LottieView from 'lottie-react-native';
import loaderJSON from '../../jsonFiles/Common/loader.json';

function LoaderSmall(props) {
  const { isLoading, styling, customSource } = props;
  return (
    <>
      {isLoading ? (
        <View style={[styles.container, styling]}>
          <LottieView
            source={customSource || loaderJSON}
            resizeMode="cover"
            loop={true}
            autoPlay={true}
            hardwareAccelerationAndroid={true}
          />
        </View>
      ) : null}
    </>
  );
}

LoaderSmall.propTypes = {
  customSource: PropTypes.any,
  isLoading: PropTypes.bool,
  styling: PropTypes.any
};

LoaderSmall.defaultProps = {
  isLoading: false,
  customSource: null
};

export default LoaderSmall;
