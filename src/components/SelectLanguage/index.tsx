import React from 'react';
import {
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import PropTypes from 'prop-types';
import { Language } from '../../locale';
import { localize, useSelectedLanguage } from '../../locale/utils';
import { styles } from './styles';

export type Option = { label: string; value: string | number };

export type SelectlanguageProps = {
  isVisible: boolean;
  handleClose: () => void;
};

function Selectlanguage({ isVisible, handleClose }: SelectlanguageProps) {
  const { language, setLanguage } = useSelectedLanguage();

  const onSelect = React.useCallback(
    (value: string) => {
      setLanguage(value as Language);
    },
    [setLanguage]
  );

  const languagePicker = () => {
    return (
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.mainModal}>
          <SafeAreaView>
            <View style={styles.bottomContainer}>
              <View style={styles.uploadMsgView}>
                <Text style={styles.label1}>
                  {`${localize('common.currentLanguage')} - ${language}`}
                </Text>
                <View style={styles.saparator} />
                <TouchableOpacity activeOpacity={0.4} onPress={() => onSelect('en')}>
                  <Text style={styles.label}>{localize('common.en')}</Text>
                </TouchableOpacity>
                <View style={styles.saparator} />
                <TouchableOpacity activeOpacity={0.4} onPress={() => onSelect('ar')}>
                  <Text style={styles.label}>{localize('common.ar')}</Text>
                </TouchableOpacity>
                <View style={styles.saparator} />
              </View>
              <View style={styles.cancelView}>
                <Text style={styles.cancelLabel} onPress={handleClose}>
                  {localize('common.cancel')}
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
        {languagePicker()}
      </Modal>
    </View>
  );
}

Selectlanguage.propTypes = {
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func
};

Selectlanguage.defaultProps = {
  isVisible: false,
  handleClose: null
};

export default Selectlanguage;
