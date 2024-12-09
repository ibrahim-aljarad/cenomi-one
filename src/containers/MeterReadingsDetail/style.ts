import { StyleSheet } from 'react-native';
import { Colors, CommonStyles } from '../../theme';
import { RfW, RfH } from '../../utils/helper';
import { BorderRadius, WIDTH } from '../../theme/sizes';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
 scrollContainer: {
  flex: 1,
  width: '100%',
},
scrollContentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
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
  directionRowCenter: { flexDirection: 'row', alignItems: 'center' },
  submitButtonStyle: {
    backgroundColor: Colors.primary,
    paddingHorizontal: WIDTH.W20,
    marginHorizontal: RfH(20),
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
  completedContainer: {
    flex: 1,
    alignItems: 'center',
  },
  previousReadingContainer: {
    marginTop: RfH(24),
    alignItems: 'center',
    backgroundColor: Colors.gray97,
    padding: RfH(20),
    borderRadius: 8,
    width: '80%',
  },
  readingLabel: {
    ...CommonStyles.regularFont500Style,
    marginBottom: RfH(8),
  },
  readingValue: {
    ...CommonStyles.boldFontStyle,
  },
  readingValueContainer: {
    backgroundColor: Colors.white,
    paddingVertical: RfH(12),
    paddingHorizontal: RfW(24),
    borderRadius: 6,
    minWidth: 120,
    alignItems: 'center',
  }
});

export default styles;
