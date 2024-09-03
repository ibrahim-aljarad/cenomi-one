import React from 'react';
import { ScrollView, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RfH, RfW, deviceWidth } from '../../utils/helpers';
import { Colors } from '../../theme';
import HeaderSVG from '../HeaderSVG';

const EventDetailsSkeleton = (props) => {
  const list = ['', '', ''];

  return (
    <View style={{ paddingBottom: RfH(60), paddingTop: RfH(15) }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SkeletonPlaceholder
          borderRadius={4}
          speed={1000}
          backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
          highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
          <SkeletonPlaceholder.Item
            width={deviceWidth()}
            height={RfH(325)}
            marginBottom={RfH(16)}
          />
        </SkeletonPlaceholder>

        <View style={{ paddingHorizontal: RfW(24), paddingBottom: RfH(16) }}>
          <SkeletonPlaceholder
            borderRadius={4}
            speed={1000}
            backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
            highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
            <SkeletonPlaceholder.Item width={deviceWidth() - RfW(48)} height={RfH(20)} />
          </SkeletonPlaceholder>
          <SkeletonPlaceholder
            borderRadius={4}
            speed={1000}
            backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
            highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
            <SkeletonPlaceholder.Item width={RfW(150)} height={RfH(20)} marginTop={RfH(8)} />
          </SkeletonPlaceholder>

          <View style={{ flexDirection: 'row', marginTop: RfH(28) }}>
            <SkeletonPlaceholder
              borderRadius={4}
              speed={1000}
              backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
              highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
              <SkeletonPlaceholder.Item width={RfW(15)} height={RfH(15)} marginRight={RfH(10)} />
            </SkeletonPlaceholder>
            <SkeletonPlaceholder
              borderRadius={4}
              speed={1000}
              backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
              highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
              <SkeletonPlaceholder.Item width={RfW(200)} height={RfH(15)} />
            </SkeletonPlaceholder>
          </View>

          <View style={{ flexDirection: 'row', marginTop: RfH(8) }}>
            <SkeletonPlaceholder
              borderRadius={4}
              speed={1000}
              backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
              highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
              <SkeletonPlaceholder.Item width={RfW(15)} height={RfH(15)} marginRight={RfH(10)} />
            </SkeletonPlaceholder>
            <View>
              <SkeletonPlaceholder
                borderRadius={4}
                speed={1000}
                backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                <SkeletonPlaceholder.Item width={deviceWidth() - RfW(73)} height={RfH(15)} />
              </SkeletonPlaceholder>
              <SkeletonPlaceholder
                borderRadius={4}
                speed={1000}
                backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                <SkeletonPlaceholder.Item width={RfW(120)} height={RfH(15)} marginTop={RfH(8)} />
              </SkeletonPlaceholder>
            </View>
          </View>

          <View style={{ marginTop: RfH(28) }}>
            <SkeletonPlaceholder
              borderRadius={4}
              speed={1000}
              backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
              highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
              <SkeletonPlaceholder.Item width={deviceWidth() - RfW(48)} height={RfH(2)} />
            </SkeletonPlaceholder>

            <View
              style={{
                marginVertical: RfH(15),
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <SkeletonPlaceholder
                borderRadius={4}
                speed={1000}
                backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                <SkeletonPlaceholder.Item width={RfW(150)} height={RfH(20)} />
              </SkeletonPlaceholder>

              <SkeletonPlaceholder
                borderRadius={4}
                speed={1000}
                backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
                highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
                <SkeletonPlaceholder.Item width={RfW(100)} height={RfH(20)} />
              </SkeletonPlaceholder>
            </View>

            <SkeletonPlaceholder
              borderRadius={4}
              speed={1000}
              backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
              highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
              <SkeletonPlaceholder.Item width={deviceWidth() - RfW(48)} height={RfH(2)} />
            </SkeletonPlaceholder>
          </View>

          <View style={{ marginTop: RfH(28) }}>
            <SkeletonPlaceholder
              borderRadius={4}
              speed={1000}
              backgroundColor={props?.isDarkMode ? Colors.darkModeButton : Colors.grey4}
              highlightColor={props?.isDarkMode ? Colors.darkModeBackground : Colors.grey5}>
              <SkeletonPlaceholder.Item alignItems="center">
                {list?.map((_) => {
                  return (
                    <SkeletonPlaceholder.Item
                      width={deviceWidth() - RfW(32)}
                      height={RfH(15)}
                      // borderRadius={RfH(8)}
                      // marginRight={RfW(12)}
                      marginBottom={RfH(16)}
                    />
                  );
                })}
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetailsSkeleton;
