import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import styles from './styles';

import { CustomImage, CustomText, IconButtonWrapper } from '../../../../components';
import { Colors, CommonStyles, Images } from '../../../../theme';
import { RfH, RfW } from '../../../../utils/helper';
import { isRTL } from '../../../../locale/utils';

const KnowledgehubDocumentsItem = (props: any) => {
  const { item, onClickItems, isDarkMode } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onClickItems(item)}
      style={[styles.item_con]}>
      <View style={styles.topTitle}>
        <View style={{ flex: 6 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <CustomText
              fontSize={16}
              color={isDarkMode ? Colors.white : Colors.white}
              styling={{
                lineHeight: RfH(20),

                ...CommonStyles.regularFont400Style
              }}>
              {item?.name}
            </CustomText>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
          <CustomImage
            image={isRTL() ? Images.arrowLeft : Images.arrowRight}
            imageWidth={RfW(8)}
            imageHeight={RfH(13)}
            imageResizeMode={'contain'}
            styling={{ marginLeft: RfW(5) }}
            tintColor={isDarkMode ? Colors.white : Colors.white}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

KnowledgehubDocumentsItem.propTypes = {
  item: PropTypes.object,
  onClickItems: PropTypes.func,
  isDarkMode: PropTypes.bool
};
KnowledgehubDocumentsItem.defaultProps = {
  onClickItems: null,
  item: {},
  isDarkMode: false
};
export default KnowledgehubDocumentsItem;
