import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { FlatList, SafeAreaView, View } from 'react-native';
import { CustomText, HeaderSVG } from '../../components';
import { Colors, CommonStyles } from '../../theme';
import { RfH, getColorWithOpacity } from '../../utils/helper';
import FaqItems from './FaqItem';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getFaq } from './redux/actions';
import { getFaqSelector } from './redux/selectors';
import { localize } from '../../locale/utils';
import { isEmpty } from 'lodash';
import { isDarkModeSelector } from '../redux/selectors';
import WrapperContainer from '../../components/WrapperContainer';
import { BorderRadius } from '../../theme/sizes';

const stateSelector = createStructuredSelector({
  faqData: getFaqSelector,
  isDarkMode: isDarkModeSelector
});

const Faq = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { faqData = [], isDarkMode } = useSelector(stateSelector);

  const [sortedFaq, setSortedFaq] = useState([]);

  useEffect(() => {
    if (isFocused) {
      dispatch(getFaq.trigger());
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isEmpty(faqData)) {
      const sorteData = faqData?.slice()?.sort((a, b) => {
        return a.order - b.order;
      });
      setSortedFaq(sorteData);
    }
  }, [faqData]);

  return (
    <WrapperContainer>
      <SafeAreaView
        style={{
          ...styles.mainContainer,
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
          }}>
          <HeaderSVG
            isRightButtonVisible={true}
            isBackButtonVisible={true}
            titleText={localize('common.faqHelp')}
            titleFont={20}
            onRightButtonClickHandler={() => {}}
            onBackPressHandler={() => navigation.goBack()}
            isRight2BtnVisible={true}
            onRight2BtnClick={() => {}}
          />
          {true ? (
            <View
              style={[
                styles.headerrowCon,
                {
                  backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
                }
              ]}>
              <CustomText
                fontSize={24}
                color={Colors.white}
                styling={{
                  ...styles.headerText,
                  ...CommonStyles.mediumFontStyle
                }}>
                {localize('common.faqTitle')}
              </CustomText>
              <FlatList
                data={sortedFaq || []}
                renderItem={({ item }) => (
                  <FaqItems isDarkMode={isDarkMode} faqItem={item} onPress={() => {}} />
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={null}
                ListFooterComponent={
                  <View
                    style={{
                      height: RfH(50)
                    }}
                  />
                }
              />
            </View>
          ) : (
            <View style={styles.no_faq_con}>
              <CustomText
                fontSize={12}
                color={isDarkMode ? Colors.white : Colors.grey8}
                styling={{
                  lineHeight: RfH(20),
                  paddingTop: RfH(5),
                  ...CommonStyles.regularFont400Style
                }}>
                {localize('login.noFaq')}
              </CustomText>
            </View>
          )}
        </View>
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default Faq;
