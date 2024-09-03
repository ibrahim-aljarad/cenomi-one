// TODO: Page not in use
import React, { useEffect, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { styles } from './styles';

function CustomLocationModal(props) {
  const { isVisible, handleClose, isPhotoPickerVisible } = props;
  const [isPickerVisible, setPickerVisibility] = useState(true);
  const [position, setPosition] = useState(null);
  const [watchPositionVal, setWatchPositionVal] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setPosition(JSON.stringify(pos));
      },
      (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true }
    );
  };

  const watchPosition = () => {
    try {
      const watchID = Geolocation.watchPosition(
        (position) => {
          setWatchPositionVal(JSON.stringify(position));
        },
        (error) => Alert.alert('WatchPosition Error', JSON.stringify(error))
      );
      setSubscriptionId(watchID);
    } catch (error) {
      Alert.alert('WatchPosition Error', JSON.stringify(error));
    }
  };

  const clearWatch = () => {
    subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
    setSubscriptionId(null);
    setWatchPositionVal(null);
  };

  useEffect(() => {
    return () => {
      clearWatch();
    };
  }, []);

  const locationPicker = () => {
    return (
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.mainModal}>
          <SafeAreaView>
            <View style={styles.bottomContainer}>
              <View style={styles.uploadMsgView}>
                <Text style={styles.label1}>Choose Location</Text>
                <View style={styles.saparator} />
                {isPhotoPickerVisible && (
                  <>
                    {subscriptionId !== null ? (
                      <TouchableOpacity activeOpacity={0.4} onPress={clearWatch}>
                        <Text style={styles.label}>Clear Position</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity activeOpacity={0.4} onPress={watchPosition}>
                        <Text style={styles.label}>Watch Position</Text>
                      </TouchableOpacity>
                    )}
                    {!isEmpty(watchPositionVal) && (
                      <Text style={styles.label}>{watchPositionVal}</Text>
                    )}

                    <View style={styles.saparator} />
                    <TouchableOpacity activeOpacity={0.4} onPress={getCurrentPosition}>
                      <Text style={styles.label}>Current location</Text>
                      {!isEmpty(position) && <Text style={styles.label}>{position}</Text>}
                    </TouchableOpacity>
                    <View style={styles.saparator} />
                  </>
                )}
              </View>
              <View style={styles.cancelView}>
                <Text style={styles.cancelLabel} onPress={handleClose}>
                  Cancel
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={handleClose}>
        {isPickerVisible && locationPicker()}
      </Modal>
    </View>
  );
}

CustomLocationModal.propTypes = {
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func,
  isFilePickerVisible: PropTypes.bool,
  isPhotoPickerVisible: PropTypes.bool,
  handleUpload: PropTypes.func,
  snapCount: PropTypes.number,
  maxFileSize: PropTypes.number,
  fileNameWithTimeStamp: PropTypes.bool
};

CustomLocationModal.defaultProps = {
  isVisible: false,
  handleClose: null,
  isPhotoPickerVisible: true,
  isFilePickerVisible: false,
  handleUpload: null,
  snapCount: 1,
  maxFileSize: 5,
  fileNameWithTimeStamp: false
};

export default CustomLocationModal;
