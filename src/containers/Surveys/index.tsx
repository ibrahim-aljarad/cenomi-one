import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/core';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { invokeSurveySparrow, onSurveyResponseListener } from 'surveysparrow-react-native-sdk';
import { CustomImage, HeaderSVG } from '../../components';
import MenuListSkeleton from '../../components/SkeletonLoader/MenuListSkeleton';
import { Colors, Images } from '../../theme';
import { CONFIG_CONSTANT } from '../../utils/constants';
import { RfH, RfW } from '../../utils/helper';
import { getSurvey, submitAcknowledge } from '../Home/redux/actions';
import { getAcknowledgeDataSelector, getSurveySelector } from '../Home/redux/selectors';
import MenuListComponent from '../Profile/MenuListComponent';
import { isDarkModeSelector } from '../redux/selectors';
import { localize } from '../../locale/utils';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  surveyList: getSurveySelector,
  acknowledgeData: getAcknowledgeDataSelector
});

const Surveys = (props: any) => {
  const { passedItem } = props?.route?.params || {};
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const { isDarkMode, surveyList, acknowledgeData } = useSelector(stateSelector);

  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    if (isFocused) {
      dispatch(getSurvey.trigger());
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isEmpty(passedItem)) {
      setSelectedItem(passedItem);
      setTimeout(() => {
        invokeSurveySparrow({
          domain: surveyDomain,
          token: passedItem?.token,
          surveyType: 'classic'
        });
      }, 300);
    }
  }, [passedItem]);

  useEffect(() => {
    if (!isEmpty(acknowledgeData) && !isEmpty(selectedItem)) {
      setSelectedItem({});
      if (!isEmpty(passedItem)) {
        navigation.goBack();
      } else {
        dispatch(getSurvey.trigger());
      }
    }
  }, [acknowledgeData]);

  const surveyDomain = 'feedback.cenomirewards.com';
  useEffect(() => {
    const sub = onSurveyResponseListener.addListener('onSurveyResponse', (data: any) => {
      if (!isEmpty(selectedItem)) {
        const info = {
          featureId: selectedItem?.id,
          featureModule: CONFIG_CONSTANT?.SURVEYS,
          metadata: {}
        };

        dispatch(submitAcknowledge.trigger({ data: info }));
      }
    });
    return () => sub.remove();
  }, [selectedItem]);

  const renderListItem = ({ item }) => {
    const element = {
      name: item?.name,
      routeName: item?.name
    };
    const isGiveSurvey = item?.isAcknowledged ? true : false;

    const tickMarkIcon = (
      <CustomImage
        image={Images.greenTickIcon}
        imageWidth={RfW(24)}
        imageHeight={RfW(24)}
        imageResizeMode={'contain'}
        displayLoader={false}
        styling={{
          overflow: 'hidden',
          marginRight: RfH(15),
          marginLeft: RfH(5)
        }}
        tintColor={isDarkMode ? Colors.white : Colors.primary}
      />
    );

    return (
      <MenuListComponent
        isDisable={isGiveSurvey ? true : false}
        isLeftIconHide={true}
        element={element}
        onClickItems={() => {
          setSelectedItem(item);
          setTimeout(() => {
            invokeSurveySparrow({
              domain: surveyDomain,
              token: item?.token,
              surveyType: 'classic'
            });
          }, 300);
        }}
        secondRightIconComponent={() => (isGiveSurvey ? tickMarkIcon : null)}
        noOfLine={1}
      />
    );
  };

  const mainSection = () => {
    if (surveyList === undefined) {
      return <MenuListSkeleton />;
    } else if (surveyList?.length > 0) {
      return (
        <View style={{ paddingHorizontal: RfW(24), paddingTop: RfH(29) }}>
          <FlatList
            data={surveyList || []}
            keyExtractor={(_, index) => index?.toString()}
            renderItem={renderListItem}
          />
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView
      style={{
        ...styles.mainContainer,
        backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.white
      }}>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.primaryContainerColor
        }}>
        <HeaderSVG
          isBackButtonVisible={true}
          titleText={localize('common.survey')}
          titleFont={20}
          onBackPressHandler={() => navigation.goBack()}
          containerStyle={{
            borderBottomColor: Colors.grayBorder,
            borderBottomWidth: RfH(1)
          }}
        />
        <ScrollView>{mainSection()}</ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0
  }
});

export default Surveys;
