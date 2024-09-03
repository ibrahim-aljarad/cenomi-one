import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { Colors, CommonStyles, Images } from '../../theme';
import Config from '../../utils/config';
import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';
import { RfH, RfW, getColorWithOpacity } from '../../utils/helper';
import { getSaveData } from '../../utils/helpers';
import CustomImage from '../CustomImage';
import CustomModalWebView from '../CustomModalWebView';
import CustomText from '../CustomText';
import UploadDocument from '../UploadDocument';
import MoreOption from './MoreOption';
import styles from './styles';
import DocumentsViewModal from '../DocumentsViewModal';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';
import { isRTL, localize } from '../../locale/utils';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const CustomAttachmentDocument = (props: any) => {
  const {
    containerStyle,
    handleDocuments = null,
    isHideHeading = false,
    isHideDescMaxSize = false,
    isHideAddMoreOption = false,
    isHideDivider = false
  } = props || {};
  const [isShowUploadAttachmentSection, setIsShowUploadAttachmentSection] = useState(false);
  const [selectedDocumentList, setSelectedDocumentList] = useState([]);
  const [isShowDocumentPickerModal, setIsShowDocumentPickerModal] = useState(false);
  const [moreOptionInfo, setMoreOptionInfo] = useState({
    isVisible: false,
    filename: ''
  });

  const { isDarkMode } = useSelector(stateSelector);

  useEffect(() => {
    setDocumentInfo({ isVisible: false });
  }, []);

  const [documentInfo, setDocumentInfo] = useState({
    title: '',
    url: '',
    fileType: '',
    isVisible: false
  });

  useEffect(() => {
    handleDocuments && handleDocuments(selectedDocumentList);
  }, [selectedDocumentList]);

  const onPressMoreButton = (data) => {
    // const {filename} = data || {};
    setMoreOptionInfo({ isVisible: true, ...data });
  };

  const onPressUploadAttachment = () => setIsShowDocumentPickerModal(true);

  const documentViewSection = () => {
    if (isEmpty(selectedDocumentList)) {
      return <></>;
    } else {
      return selectedDocumentList?.map((item) => {
        return (
          <View
            style={[
              styles.documentItemContainer,
              { backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white }
            ]}>
            <View style={[styles.directionRowCenter, { width: '70%' }]}>
              <CustomImage
                image={Images.attachmentFile}
                imageWidth={18}
                imageHeight={20}
                imageResizeMode={'contain'}
                displayLoader={false}
                containerStyling={{}}
                tintColor={isDarkMode ? Colors.white : Colors.app_black}
              />
              <CustomText
                fontSize={14}
                color={isDarkMode ? Colors.white : Colors.attachmentDocTitleColor}
                styling={{
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(17),
                  paddingLeft: RfW(12)
                }}>
                {item?.name || 'Document.pdf'}
              </CustomText>
            </View>
            <View style={styles.directionRowCenter}>
              <CustomImage
                image={Images.successTick}
                imageWidth={24}
                imageHeight={24}
                imageResizeMode={'contain'}
                displayLoader={false}
                containerStyling={{}}
              />
              <TouchableOpacity onPress={() => onPressMoreButton(item)}>
                <CustomImage
                  image={Images.more}
                  imageWidth={26}
                  imageHeight={26}
                  imageResizeMode={'contain'}
                  displayLoader={false}
                  containerStyling={{ paddingLeft: RfH(8) }}
                  tintColor={isDarkMode ? Colors.white : Colors.app_black}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      });
    }
  };

  const uploadAttachmentSection = () => {
    return (
      <>
        <CustomText
          fontSize={14}
          styling={{
            ...CommonStyles.regularFont400Style,
            lineHeight: RfH(20),
            color: isDarkMode ? Colors.silverColor : Colors.white,
            paddingTop: RfH(10)
          }}>
          {localize('components.uploadDocument')}
        </CustomText>
        <TouchableOpacity
          style={[
            styles.uploadItemContainer,
            { borderColor: isDarkMode ? Colors.white : Colors.black }
          ]}
          onPress={onPressUploadAttachment}>
          <View style={styles.directionRowCenter}>
            <CustomImage
              image={Images.uploadVoilet}
              imageWidth={22}
              imageHeight={24}
              imageResizeMode={'contain'}
              displayLoader={false}
              containerStyling={{}}
              tintColor={isDarkMode ? Colors.white : Colors.black}
            />
            <CustomText
              fontSize={14}
              color={Colors.black}
              styling={{
                ...CommonStyles.regularFont500Style,
                lineHeight: RfH(17),
                marginLeft: RfW(12),
                marginTop: RfH(2)
              }}>
              {localize('components.uploadAttachment')}
            </CustomText>
          </View>

          <CustomImage
            image={isRTL() ? Images.arrowLeft : Images.arrowRight}
            imageWidth={15}
            imageHeight={15}
            imageResizeMode={'contain'}
            displayLoader={false}
            containerStyling={{}}
            tintColor={isDarkMode ? Colors.white : Colors.black}
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <View style={{ ...styles.container, ...containerStyle }}>
        {!isHideHeading ? (
          <CustomText
            fontSize={20}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(22),
              color: isDarkMode ? Colors.silverColor : Colors.white
            }}>
            {/* {isEmpty(selectedDocumentList) ? 'Add File' : 'Attachments'} */}
            {localize('approvals.attachments')}
          </CustomText>
        ) : null}
        {!isHideDivider ? (
          <View
            style={{ height: RfH(1), marginVertical: RfH(15), backgroundColor: Colors.grayBorder }}
          />
        ) : null}
        {!isHideDescMaxSize ? (
          <CustomText
            fontSize={14}
            color={getColorWithOpacity(Colors.white, 0.6)}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(22),
              marginTop: RfH(15)
            }}>
            {localize('components.uploadConditions')}
          </CustomText>
        ) : null}
        {documentViewSection()}
        {isShowUploadAttachmentSection || isEmpty(selectedDocumentList) ? (
          uploadAttachmentSection()
        ) : (
          <></>
        )}
        {!isHideAddMoreOption ? (
          <TouchableOpacity
            style={styles.addMoreTextContainer}
            onPress={() => setIsShowUploadAttachmentSection(true)}>
            <CustomText
              fontSize={14}
              color={Colors.white}
              styling={{
                ...CommonStyles.regularFont500Style,
                lineHeight: RfH(17),
                textAlign: 'left'
              }}>
              {localize('components.addMoreDocuments')}
            </CustomText>
          </TouchableOpacity>
        ) : null}
      </View>
      <UploadDocument
        title={localize('components.documents')}
        isVisible={isShowDocumentPickerModal}
        isFilePickerVisible={true}
        handleClose={() => setIsShowDocumentPickerModal(false)}
        isUploadFileOnServer={true}
        handleUpload={(data) => {
          const { filename, name } = data || {};
          setIsShowUploadAttachmentSection(false);
          setIsShowDocumentPickerModal(false);
          setSelectedDocumentList([...selectedDocumentList, { ...data }]);
        }}
      />
      {moreOptionInfo?.isVisible ? (
        <MoreOption
          isDarkMode={isDarkMode}
          isVisible={moreOptionInfo?.isVisible}
          handleClose={() => setMoreOptionInfo({ isVisible: false, filename: '' })}
          clickOnDelete={() => {
            const filteredData = selectedDocumentList?.filter(
              (item) => item?.filename !== moreOptionInfo?.filename
            );
            setSelectedDocumentList([...filteredData]);
            setMoreOptionInfo({ isVisible: false, filename: '' });
          }}
          clickOnViewDoc={async () => {
            const token = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN);
            const finalUrl = `${Config?.API_BASE_URL}upload/preview?filename=${moreOptionInfo?.filename}&token=${token}`;
            const splitedData = moreOptionInfo?.filename?.split('.');
            const finalFileType =
              splitedData?.length > 0 ? splitedData[splitedData?.length - 1] : '';
            setDocumentInfo({
              title: moreOptionInfo?.name,
              url: finalUrl,
              fileType: finalFileType,
              isVisible: true
            });

            setMoreOptionInfo({ isVisible: false, filename: '' });
          }}
        />
      ) : (
        <></>
      )}

      {documentInfo?.isVisible ? (
        <DocumentsViewModal
          isVisible={documentInfo?.isVisible}
          documentInfo={documentInfo}
          onRequestClose={() => {
            setDocumentInfo({
              title: '',
              url: '',
              fileType: '',
              isVisible: false
            });
          }}
          onClick={(item) => {}}
        />
      ) : (
        // <CustomModalWebView
        //   headerText={documentInfo?.title}
        //   rightButtonVisible={true}
        //   backButtonHandler={() =>
        //     setDocumentInfo({
        //       title: '',
        //       url: '',
        //       fileType: '',
        //       isVisible: false
        //     })
        //   }
        //   onLoadComplete={() => {}}
        //   modalVisible={documentInfo?.isVisible}
        //   url={documentInfo?.url}
        // />
        <></>
      )}
    </>
  );
};

export default CustomAttachmentDocument;
