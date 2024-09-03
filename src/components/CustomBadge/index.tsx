import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Colors, CommonStyles } from '../../theme';
import { RfH, RfW } from '../../utils/helper';
import CustomText from '../CustomText';
import { BadgeCountSkeleton } from '../SkeletonLoader';

const CustomBadge = (props: any) => {
  const { loading, count, backgroundColor } = props || {};
  return (
    <View style={styles.badgeContainer}>
      {loading ? (
        <BadgeCountSkeleton isDarkMode={props.isDarkMode} />
      ) : count > 0 ? (
        <View style={[styles.badgeCountIcon, backgroundColor && { backgroundColor }]}>
          <CustomText
            numberOfLines={1}
            fontSize={count > 99 ? 10 : 11}
            color={Colors.white}
            styling={{
              ...CommonStyles.regularFont500Style,
              top: Platform.OS === 'ios' ? 1 : 0
            }}>
            {count > 99 ? '99+' : count}
          </CustomText>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: RfH(-10),
    left: RfW(0)
  },
  badgeCountIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkPurple,
    borderRadius: RfH(24 / 2),
    height: RfH(24),
    width: RfH(24)
  }
});

export default CustomBadge;
