import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CustomText } from '../../../components';
import { Colors, CommonStyles } from '../../../theme';
import { RfW } from '../../../utils/helpers';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../redux/selectors';
import { localize } from '../../../locale/utils';
import { RfH, getColorWithOpacity } from '../../../utils/helper';
import { BorderRadius } from '../../../theme/sizes';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const HeaderCateRow = (props: any) => {
  const { categoryName, onClickSeeAll, showSeeAll } = props;

  const { isDarkMode } = useSelector(stateSelector);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: RfW(24)
      }}>
      <CustomText
        fontSize={18}
        color={isDarkMode ? Colors.white : Colors.white}
        styling={{ ...CommonStyles.regularFont500Style }}>
        {categoryName}
      </CustomText>
      {showSeeAll && (
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={onClickSeeAll}
          style={{
            backgroundColor: getColorWithOpacity(Colors.blueBayoux, 0.37),
            paddingHorizontal: RfW(12),
            paddingTop: RfH(8),
            paddingBottom: RfH(5),
            borderRadius: BorderRadius.BR5
          }}>
          <CustomText fontSize={12} color={Colors.white} styling={CommonStyles.regularFont500Style}>
            {localize('common.seeAll')}
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderCateRow;
