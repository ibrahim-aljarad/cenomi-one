import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import styles from './styles';

import { CustomRenderHtml, CustomText, IconButtonWrapper } from '../../../components';
import { Colors, CommonStyles, Images } from '../../../theme';
import { RfH, RfW, getColorWithOpacity } from '../../../utils/helper';
import { BorderRadius } from '../../../theme/sizes';

const FaqItems = (props: any) => {
  const { faqItem, onPress, isDarkMode } = props;

  const [isOpen, setIsOpen] = useState(false);

  const darkCard = {
    backgroundColor: isDarkMode
      ? Colors.darkModeButton
      : getColorWithOpacity(Colors.midnightExpress, 0.24),
    borderRadius: BorderRadius.BR15
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => {
        setIsOpen(!isOpen);
        onPress(faqItem);
      }}
      style={[styles.item_con, darkCard]}>
      <View style={styles.topTitle}>
        <View style={{ flex: 6 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <CustomText
              fontSize={14}
              color={Colors.white}
              styling={{
                lineHeight: RfH(20),
                width: '95%',
                ...CommonStyles.mediumFontStyle
              }}>
              {faqItem.question}
            </CustomText>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end'
              }}>
              <IconButtonWrapper
                iconImage={
                  isOpen
                    ? isDarkMode
                      ? Images.minusWhite
                      : Images.minusWhite
                    : // : Images.faqMunus
                    isDarkMode
                    ? Images.plusWhite
                    : Images.plusWhite
                  // : Images.faqPlus
                }
                iconWidth={RfW(12)}
                iconHeight={RfW(12)}
                imageResizeMode={'contain'}
              />
            </View>
          </View>
          {isOpen && (
            <CustomRenderHtml
              source={faqItem?.answer}
              tagsStyles={{
                body: {
                  whiteSpace: 'normal',
                  color: isDarkMode ? Colors.white : Colors.white,
                  fontSize: 14,
                  lineHeight: 22,
                  ...CommonStyles.regularFont400Style
                }
              }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

FaqItems.propTypes = {
  approvalItem: PropTypes.object,
  onPress: PropTypes.func,
  isCompleted: PropTypes.bool,
  isDarkMode: PropTypes.bool
};
FaqItems.defaultProps = {
  onPress: null,
  approvalItem: {},
  isCompleted: false,
  isDarkMode: false
};
export default FaqItems;
