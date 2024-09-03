import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Pdf from 'react-native-pdf';
import { CustomText, IconButtonWrapper } from '..';
import { Colors, CommonStyles, Images } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';
import Loader from '../Loader';
import styles from './styles';
import { localize } from '../../locale/utils';

function PdfModel(props) {
  const { isVisible, openModal, title, url } = props;
  const [isError, setIsError] = useState(false);
  const source = {
    uri: url,
    cache: true
  };

  const modalHeader = () => (
    <View
      style={[
        styles.header,
        {
          backgroundColor: Colors.white
        }
      ]}>
      <View
        style={{
          width: RfW(50),
          height: RfH(5),
          backgroundColor: Colors.silverColor,
          alignSelf: 'center',
          borderRadius: RfW(3)
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: RfH(25)
        }}>
        <CustomText color={Colors.blackFour} fontSize={20} styling={CommonStyles.mediumFontStyle}>
          {title}
        </CustomText>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={openModal}
          style={{ marginRight: RfW(-12), padding: RfH(12) }}>
          <IconButtonWrapper
            iconWidth={RfH(18)}
            iconHeight={RfH(18)}
            iconImage={Images.crossBlack}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const mainView = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center'
      }}>
      <View
        style={[
          styles.innerView,
          {
            flex: 1,

            backgroundColor: Colors.white
          }
        ]}>
        {modalHeader()}
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.white
          }}>
          {!isError && (
            <Pdf
              source={source}
              onLoadComplete={(numberOfPages, path) => {
                // onLoadComplete(numberOfPages, path);
              }}
              onError={(error) => {
                // onLoadComplete();
                setIsError(true);
              }}
              renderActivityIndicator={(progress) => <Loader isLoading={true} />}
              style={styles.pdf}
            />
          )}
          {isError && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>{localize('common.someThingWentWrong')}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <Modal animationType="none" transparent={true} visible={isVisible} onRequestClose={openModal}>
      <TouchableWithoutFeedback>
        <View style={styles.containertwo}>{mainView()}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

PdfModel.propTypes = {
  isVisible: PropTypes.bool,
  openModal: PropTypes.func,
  onClick: PropTypes.func,
  title: PropTypes.string,
  url: PropTypes.string
};
PdfModel.defaultProps = {
  isVisible: false,
  openModal: null,
  onClick: null,
  url: '',
  title: ''
};
export default PdfModel;
