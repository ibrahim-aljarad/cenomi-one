// TODO: Page not in use
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal, SafeAreaView, Text, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { Colors, Images } from '../../theme';
import Header from '../Header';
import Loader from '../Loader';
import style from './styles';
import { localize } from '../../locale/utils';

function CustomModalPDF(props) {
  const {
    headerText,
    url,
    backButtonHandler,
    onLoadComplete,
    modalVisible,
    isRightButtonVisible,
    handleShare,
    isLoading
  } = props;

  const [cacheFilePath, setCacheFilePath] = useState('');
  const [isError, setIsError] = useState(false);
  const source = { uri: url, cache: true };

  return (
    <Modal
      visible={modalVisible}
      animationType={'slide'}
      backdropOpacity={1}
      transparent={true}
      onRequestClose={() => backButtonHandler()}>
      <Loader isLoading={isLoading} />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <Header
          titleText={headerText}
          isRightButtonVisible={!isEmpty(cacheFilePath) && isRightButtonVisible}
          isBackButtonVisible={true}
          onBackPressHandler={backButtonHandler}
          rightButtonImage={Images.share}
          onRightButtonClickHandler={() => {}}
        />
        <View style={style.container}>
          {!isError && (
            <Pdf
              source={source}
              onLoadComplete={(numberOfPages, path) => {
                setCacheFilePath(path);
                onLoadComplete(numberOfPages, path);
              }}
              onError={(error) => {
                onLoadComplete();
                setIsError(true);
              }}
              renderActivityIndicator={(progress) => <Loader isLoading={true} />}
              style={style.pdf}
            />
          )}
          {isError && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>{localize('common.someThingWentWrong')}</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

CustomModalPDF.propTypes = {
  headerText: PropTypes.string,
  url: PropTypes.string,
  backButtonHandler: PropTypes.func,
  onLoadComplete: PropTypes.func,
  modalVisible: PropTypes.bool,
  isRightButtonVisible: PropTypes.bool,
  handleShare: PropTypes.func,
  isLoading: PropTypes.bool
};

CustomModalPDF.defaultProps = {
  headerText: '',
  url: '',
  modalVisible: false,
  isRightButtonVisible: false,
  handleShare: null,
  onLoadComplete: () => {},
  isLoading: false
};

export default CustomModalPDF;
