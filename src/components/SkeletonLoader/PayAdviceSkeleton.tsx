import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW, isDisplayWithNotch } from '../../utils/helpers';
import { Colors, CommonStyles } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { getColorWithOpacity } from '../../utils/helper';

const PayAdviceSkeleton = (props: any) => {
  const { isDarkMode } = props || {};

  const darkCard = {
    backgroundColor: isDarkMode
      ? Colors.darkModeButton
      : getColorWithOpacity(Colors.midnightExpress, 0.24),
    borderRadius: BorderRadius.BR15
  };

  return (
    <View
      style={{
        marginHorizontal: RfW(24),
        paddingTop: RfH(14),
        marginTop: RfH(16),
        minHeight: RfH(250),
        marginBottom: RfH(40),
        ...darkCard
      }}>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={RfW(100)}
          height={RfH(25)}
          marginHorizontal={RfW(24)}
          alignItems="center"
          justifyContent="center"
        />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={RfW(150)}
          height={RfH(15)}
          marginTop={RfH(10)}
          marginHorizontal={RfW(24)}
          alignItems="center"
          justifyContent="center"
        />
      </SkeletonPlaceholder>

      <View
        style={{
          borderColor: Colors.grayBorder,
          borderWidth: 1,
          borderRadius: BorderRadius.BR0,
          marginHorizontal: RfW(11),
          marginVertical: RfH(19)
        }}>
        {['', '', '', '']?.map((item) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: Colors.grayBorder,
                borderBottomWidth: 1
              }}>
              <View style={styles.leaveBalLeftView}>
                <SkeletonPlaceholder
                  speed={1000}
                  backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
                  highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                  <SkeletonPlaceholder.Item
                    width={RfW(80)}
                    height={RfH(15)}
                    marginVertical={RfH(5)}
                    alignItems="center"
                    justifyContent="center"
                  />
                </SkeletonPlaceholder>
              </View>
              <View style={styles.leaveBalRightView}>
                <SkeletonPlaceholder
                  speed={1000}
                  backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
                  highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                  <SkeletonPlaceholder.Item
                    width={RfW(80)}
                    height={RfH(15)}
                    marginVertical={RfH(5)}
                    alignItems="center"
                    justifyContent="center"
                  />
                </SkeletonPlaceholder>
              </View>
            </View>
          );
        })}
      </View>
      <SkeletonPlaceholder
        speed={1000}
        backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.grey4}
        highlightColor={isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
        <SkeletonPlaceholder.Item
          width={RfW(250)}
          height={RfH(15)}
          marginHorizontal={RfW(24)}
          marginBottom={RfH(20)}
          alignItems="center"
          justifyContent="center"
        />
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    paddingTop: isDisplayWithNotch() ? RfH(30) : RfH(10),
    flex: 1
  },
  leaveBalLeftView: {
    flex: 1,
    paddingVertical: RfH(14),
    paddingLeft: RfW(17.47),
    borderRightColor: Colors.grayBorder,
    borderRightWidth: 0.5,
    width: '55%'
  },
  leaveBalRightView: {
    flex: 1,
    paddingVertical: RfW(14),
    paddingHorizontal: RfW(7),
    borderLeftColor: Colors.grayBorder,
    borderLeftWidth: 0.5,
    alignItems: 'center'
  },
  empDetailsLeftView: {
    flex: 1,
    paddingTop: RfH(10),
    paddingLeft: RfW(21)
  },
  empDetailsRightView: {
    flex: 1,
    paddingTop: RfW(10),
    paddingLeft: RfW(16)
  }
});

export default PayAdviceSkeleton;
