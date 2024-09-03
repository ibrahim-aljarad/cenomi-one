import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import style from './styles';
import { Colors } from '../../theme';
import Header from '../Header';
import Loader from '../Loader';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

function MapViewModal(props) {
  const { headerText, backButtonHandler, isVisible, isRightButtonVisible, isLoading } = props;

  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const coordinates = pos.coords;
        setPosition({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421
        });
      },
      (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <Modal
      visible={isVisible}
      animationType={'slide'}
      backdropOpacity={1}
      transparent={true}
      onRequestClose={() => backButtonHandler()}>
      <Loader isLoading={isLoading} />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <Header
          titleText={headerText}
          isRightButtonVisible={isRightButtonVisible}
          isBackButtonVisible={true}
          onBackPressHandler={backButtonHandler}
          onRightButtonClickHandler={() => {}}
        />
        <View style={style.container}>
          <MapView
            style={{ ...StyleSheet.absoluteFillObject }}
            followUserLocation={true}
            zoomEnabled={true}
            initialRegion={position}
            showsUserLocation={true}>
            <Marker
              title="Yor are here"
              description="This is a description"
              coordinate={position}
            />
          </MapView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

MapViewModal.propTypes = {
  headerText: PropTypes.string,
  backButtonHandler: PropTypes.func,
  onLoadComplete: PropTypes.func,
  isVisible: PropTypes.bool,
  isLoading: PropTypes.bool
};

MapViewModal.defaultProps = {
  headerText: '',
  isVisible: false,
  isRightButtonVisible: false,
  handleShare: null,
  onLoadComplete: () => {},
  isLoading: false
};

export default MapViewModal;
