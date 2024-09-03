import React from 'react';
import CustomEditComment from '../../../components/CustomEditComment';
import { isHideComments } from '../serializer';
import { localize } from '../../../locale/utils';
import { Colors } from '../../../theme';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { RfH, RfW, getColorWithOpacity } from '../../../utils/helper';
import { BorderRadius } from '../../../theme/sizes';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const CommentComponent = (props: any) => {
  const { isDarkMode } = useSelector(stateSelector);
  const { onCommentChange, absenceType } = props || {};
  const isHide = isHideComments(absenceType);

  if (isHide) {
    return <></>;
  }

  return (
    // <CustomEditComment
    //   usedForLeaveForm={true}
    //   label={localize('common.comments')}
    //   placeholder={localize('leave.typeYourComments')}
    //   onCommentChange={onCommentChange}
    //   backgroundColor={isDarkMode ? Colors.darkModeButton : Colors.white}
    // />
    <View style={styles.container}>
      <CustomEditComment
        label={localize('common.comments')}
        placeholder={localize('leave.typeYourComments')}
        onCommentChange={onCommentChange}
        containerStyle={{ marginTop: RfW(0), paddingHorizontal: RfW(0) }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: getColorWithOpacity(Colors.midnightExpress, 0.24),
    padding: RfW(15),
    marginHorizontal: RfW(24),
    marginTop: RfH(15),
    borderRadius: BorderRadius.BR15
  }
});

export default CommentComponent;
