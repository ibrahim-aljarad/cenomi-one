import { StyleSheet } from 'react-native';
import { Colors, CommonStyles } from '../../theme';
import { BorderRadius, WIDTH } from '../../theme/sizes';
import { RfW, RfH, getColorWithOpacity } from '../../utils/helper';

const CONTAINER_PADDING = RfW(16);

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    contentWrapper: {
        flex: 1,
        position: 'relative',
      },
    scrollContainer: {
      flex: 1,
      width: '100%',
    },
    contentContainer: {
      flexGrow: 1,
      paddingHorizontal: CONTAINER_PADDING,
      paddingBottom: RfH(40),
    },
    uploadItemContainer: {
      borderRadius: BorderRadius.BR15,
      backgroundColor: Colors.white,
      padding: RfH(16),
      marginVertical: RfH(15),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    directionRowCenter: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    submitButtonStyle: {
      backgroundColor: Colors.primary,
      marginVertical: RfH(20),
    },
    imagePreviewContainer: {
      marginTop: RfH(16),
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: Colors.black,
    },
    previewImage: {
      width: '100%',
      height: RfH(200),
    },
    retakeButton: {
      position: 'absolute',
      bottom: RfH(16),
      right: RfW(16),
      backgroundColor: 'rgba(0,0,0,0.6)',
      padding: RfW(8),
      borderRadius: 4,
    },
    retakeButtonText: {
      ...CommonStyles.regularFont500Style,
    },
    meterCountContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: RfH(15),
    },
    item_con: {
      flexDirection: "row",
      marginVertical: RfH(8),
      borderRadius: BorderRadius.BR15,
      padding: RfH(15),
    },
    statusPill: {
      alignSelf: "flex-start",
      paddingHorizontal: RfW(12),
      paddingVertical: RfH(4),
      borderRadius: RfH(12),
      borderWidth: 1,
      backgroundColor: getColorWithOpacity("#7716FF", 0.1),
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: RfH(16),
      marginTop: RfH(8),
    },
    tab: {
      flex: 1,
      paddingVertical: RfH(8),
      marginHorizontal: RfW(4),
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
      shadowColor: Colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    activeTab: {
      elevation: 4,
      shadowOpacity: 0.2,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: CONTAINER_PADDING,
      },
      submitAllButtonStyle: {
        backgroundColor: Colors.primary,
      },
  });

export default styles;
