import {
  Platform,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";

import { alertBox } from "../../utils/helpers";
import { styles } from "./styles";
import DocumentPicker from "react-native-document-picker";
import PropTypes from "prop-types";
import { Colors, Images } from "../../theme";
import { isEmpty, uniqueId } from "lodash";
import ImagePicker from "react-native-image-crop-picker";
import { RfH, RfW } from "../../utils/helper";
import { ImageUploaderComponentErrorCode } from "../../constant";
import CustomImage from "../CustomImage";
import CustomText from "../CustomText";
import { isRTL, localize } from "../../locale/utils";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  getFilePreviewedDataSelector,
  getFileUploadedDataSelector,
  isDarkModeSelector,
} from "../../containers/redux/selectors";
import { fileUpload, tenantFileUpload } from "../../containers/redux/actions";
import CustomBottomSheet from "../CustomBottomSheet";
import AvatarUpload from "./AvatarUpload";
const RNFS = require("react-native-fs");
// const imageCompressionQuality = 0.5;

import { Buffer } from "buffer";

export const base64ToArrayBuffer = (base64) => {
  // Decode the Base64 string using Buffer
  const byteString = Buffer.from(base64, "base64");

  // Create an ArrayBuffer from the byte string
  const arrayBuffer = byteString.buffer.slice(
    byteString.byteOffset,
    byteString.byteOffset + byteString.byteLength
  );

  return arrayBuffer; // Return the ArrayBuffer
};

export const DocumentType = {
  DISCREPANCY: "SR_DSC_OPN",
  METER_READING: "SR_MRC_OPN",
} as const;

export type DocumentTypeId = (typeof DocumentType)[keyof typeof DocumentType];

const documentTypeValidator = (props, propName, componentName) => {
  const { isTenantServerUpload, documentTypeId } = props;

  if (isTenantServerUpload) {
    if (!documentTypeId) {
      return new Error(
        `${propName} is required when isTenantServerUpload is true in ${componentName}`
      );
    }
    if (!Object.values(DocumentType).includes(documentTypeId)) {
      return new Error(
        `Invalid ${propName} '${documentTypeId}' supplied to ${componentName}. ` +
          `Must be one of: ${Object.values(DocumentType).join(", ")}`
      );
    }
  }
};

const stateStructure = createStructuredSelector({
  fileUploadedData: getFileUploadedDataSelector,
  filePreviewedData: getFilePreviewedDataSelector,
  isDarkMode: isDarkModeSelector,
});
function UploadDocument(props) {
  const { fileUploadedData, filePreviewedData, isDarkMode } =
    useSelector(stateStructure);

  const {
    title = "",
    isVisible,
    handleClose,
    isPhotoPickerVisible,
    isFilePickerVisible,
    handleUpload,
    maxFileSize,
    isCopyRequired,
    isUploadFileOnServer = false,
    isAvatarVisible,
    cropping = false,
    openCameraDefault = false,
    imageCompressionQuality = 1,
    isTenantServerUpload = false,
    documentTypeId,
  } = props;
  const [imageSet, updateImageSet] = useState([]);
  const [isEnableUploadDocument, setIsEnableUploadDocument] = useState(false);
  const [isVisibleAvatar, setIsVisibleAvatar] = useState(false);

  const dispatch = useDispatch();

  const uploadDocument = (selectedFileData) => {
    const filesUpload = async () => {
      const { fileName, path, mime } = selectedFileData || {};
      if (isTenantServerUpload && !documentTypeId) {
        alertBox(
          localize("common.error"),
          "Document type ID is required for tenant file uploads",
          {
            positiveText: localize("common.gotit"),
            onPositiveClick: handleClose,
          }
        );
        return;
      }
      try {
        // Read the file as a Base64 string
        const base64String = await RNFS.readFile(path, "base64");

        // Convert to ArrayBuffer
        const arrayBuffer = base64ToArrayBuffer(base64String);
        console.log("arrayBuffer", arrayBuffer);
        dispatch(
          tenantFileUpload.trigger({
            fileName,
            document_type_id: documentTypeId,
            mime: mime?.split("/")[1],
            file: arrayBuffer,
          })
        );
        return arrayBuffer;
      } catch (error) {
        console.error("Error reading file:", error);
      }
    };
    if (isTenantServerUpload) {
      filesUpload();
      handleUpload(selectedFileData);
    } else if (!isUploadFileOnServer) {
      handleUpload(selectedFileData);
    } else {
      setIsEnableUploadDocument(true);
      const { fileName, path, mime } = selectedFileData || {};
      dispatch(fileUpload.trigger({ fileName, path, mime }));
    }
  };

  const onPressUploadAvatar = (selectedFile) => {
    handleClose();
    setIsVisibleAvatar(false);
    const data = {
      path: selectedFile.url,
      fileName: selectedFile.name,
      mime: "image/png",
      // size: selectedFile.size
    };
    uploadDocument(data);
  };

  useEffect(() => {
    if (!isEmpty(fileUploadedData) && isEnableUploadDocument) {
      setIsEnableUploadDocument(false);

      handleUpload(fileUploadedData);
    }
  }, [fileUploadedData]);

  useEffect(() => {
    if (isVisible && openCameraDefault) {
      openCamera();
    }
  }, [isVisible]);

  const closeWindow = () => {
    handleClose();
    // setPickerVisibility(true);
    // setPreviewVisibility(false);
    updateImageSet([]);
  };

  const checkFileSize = (files) => {
    let fileSize = 0;
    files.forEach((file) => {
      fileSize += file.size;
      console.log("Indivisual file Size", file.size);
    });
    console.log("Total Size", fileSize);
    if (maxFileSize && maxFileSize * 1000000 < fileSize) {
      alertBox(
        localize("common.error"),
        `${localize("common.maxFileSize")} ${maxFileSize} ${localize(
          "common.MB"
        )}`,
        {
          positiveText: localize("common.gotit"),
          onPositiveClick: () => {
            if (imageSet.length === 0) {
              closeWindow();
            }
          },
        }
      );
      return false;
    } else {
      return true;
    }
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      compressImageQuality: imageCompressionQuality || 1,
      mediaType: "photo",
      // includeBase64: true,
      cropping: cropping,
    })
      .then((image) => {
        handleClose();
        const isFileSizeCorrect = checkFileSize([...imageSet, image]);
        if (isFileSizeCorrect) {
          const tempImageName = uniqueId() + ".jpg";
          const data = {
            path: image.path,
            fileName: tempImageName,
            mime: image.mime,
            size: image.size,
            // base64Data: image.data,
          };

          uploadDocument(data);
        } else if (imageSet.length > 0) {
          //
        }
      })
      .catch((err) => {
        if (
          err.code ===
          ImageUploaderComponentErrorCode.E_NO_CAMERA_PERMISSION_KEY
        ) {
          alertBox(
            localize("components.requiredPermissionMissing"),
            localize("components.cameraPermissionMsg"),
            {
              positiveText: localize("common.settings"),
              onPositiveClick: () => {
                Linking.openSettings();
              },
              negativeText: localize("common.cancel"),
            }
          );
        }
        closeWindow();
      });
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      // compressImageQuality: imageCompressionQuality,
      mediaType: "photo",
      // includeBase64: true,
      // cropping: true,
    })
      .then((images) => {
        const splitedImageName = images?.path?.split(".");
        const finalFileName =
          splitedImageName?.length > 0
            ? splitedImageName[splitedImageName?.length - 2]
            : uniqueId();
        const temp = {
          path: images.path,
          fileName: finalFileName + ".jpg",
          mime: images.mime,
          size: images.size,
          // base64Data: images.data,
        };
        const isFileSizeCorrect = checkFileSize([...imageSet, temp]);
        if (isFileSizeCorrect) {
          uploadDocument(temp);
        } else if (imageSet.length > 0) {
          //
        }
        closeWindow();
      })
      .catch((err) => {
        if (
          err.code ===
          ImageUploaderComponentErrorCode.E_NO_LIBRARY_PERMISSION_KEY
        ) {
          alertBox(
            localize("components.requiredPermissionMissing"),
            localize("components.galleryPermissonMsg"),
            {
              positiveText: localize("common.settings"),
              onPositiveClick: () => {
                Linking.openSettings();
              },
              negativeText: localize("common.cancel"),
            }
          );
        }
        closeWindow();
      });
  };

  const openDocPicker = async () => {
    try {
      let options = {
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      };
      if (Platform.OS === "ios" && isCopyRequired) {
        options = {
          ...options,
          copyTo: "cachesDirectory",
        };
      }
      const res = await DocumentPicker.pickSingle(options);
      const isFileSizeCorrect = checkFileSize([res]);
      if (isFileSizeCorrect) {
        const fileURL =
          Platform.OS === "ios" && isCopyRequired ? res.fileCopyUri : res.uri;
        const urlDecoded =
          Platform.OS === "ios" ? decodeURIComponent(fileURL) : fileURL;
        const fileName = res?.name;

        RNFS.readFile(urlDecoded, "base64").then((data) => {
          const dataInfo = {
            // base64Data: data,
            path: fileURL,
            mime: res.type,
            fileName,
          };
          uploadDocument(dataInfo);
          closeWindow();
        });
      }
    } catch (err) {
      console.log("err", err);
      closeWindow();
    }
  };

  const chooseAvatar = () => {
    // handleClose();
    setIsVisibleAvatar(true);
  };

  const filePicker = () => {
    return (
      <TouchableWithoutFeedback onPress={handleClose}>
        <SafeAreaView
          style={{
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.modalForegroundColor,
          }}
        >
          {isPhotoPickerVisible ? (
            <>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: RfW(24),
                  alignItems: "center",
                }}
                activeOpacity={0.4}
                onPress={() => {
                  // handleClose();
                  openCamera();
                }}
              >
                <CustomText
                  styling={styles.label}
                  color={isDarkMode ? Colors.white : Colors.white}
                  // color={isDarkMode ? Colors.white : Colors.app_black}
                >
                  {localize("common.takeAPhoto")}
                </CustomText>
                <CustomImage
                  image={isRTL() ? Images.arrowLeft : Images.arrowRight}
                  imageWidth={RfH(16)}
                  imageHeight={RfH(16)}
                  imageResizeMode={"contain"}
                  displayLoader={false}
                  styling={{
                    overflow: "hidden",
                    top: RfH(5),
                  }}
                  tintColor={isDarkMode ? Colors.white : Colors.white}
                />
              </TouchableOpacity>
              <View
                style={{
                  height: RfH(1),
                  backgroundColor: Colors.platiniumOne,
                  marginVertical: RfH(10),
                  marginHorizontal: RfW(24),
                }}
              />

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: RfW(24),
                  alignItems: "center",
                }}
                activeOpacity={0.4}
                onPress={() => {
                  // handleClose();
                  openGallery();
                }}
              >
                {/* <Text style={styles.label}>Choose from gallery</Text> */}
                <CustomText
                  styling={styles.label}
                  color={isDarkMode ? Colors.white : Colors.white}
                >
                  {localize("common.chooseFromGallery")}
                </CustomText>
                <CustomImage
                  image={isRTL() ? Images.arrowLeft : Images.arrowRight}
                  imageWidth={RfH(16)}
                  imageHeight={RfH(16)}
                  imageResizeMode={"contain"}
                  displayLoader={false}
                  styling={{
                    overflow: "hidden",
                    top: RfH(5),
                  }}
                  tintColor={isDarkMode ? Colors.white : Colors.white}
                />
              </TouchableOpacity>
              <View
                style={{
                  height: RfH(1),
                  backgroundColor: Colors.platiniumOne,
                  marginVertical: RfH(10),
                  marginHorizontal: RfW(24),
                }}
              />
            </>
          ) : null}
          {isFilePickerVisible ? (
            <>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: RfW(24),
                  alignItems: "center",
                }}
                activeOpacity={0.4}
                onPress={() => {
                  // handleClose();
                  openDocPicker();
                }}
              >
                {/* <Text style={styles.label}>File</Text> */}
                <CustomText
                  styling={styles.label}
                  color={isDarkMode ? Colors.white : Colors.white}
                >
                  {localize("common.file")}
                </CustomText>
                <CustomImage
                  image={isRTL() ? Images.arrowLeft : Images.arrowRight}
                  imageWidth={RfH(16)}
                  imageHeight={RfH(16)}
                  imageResizeMode={"contain"}
                  displayLoader={false}
                  styling={{
                    overflow: "hidden",
                    top: RfH(5),
                  }}
                  tintColor={isDarkMode ? Colors.white : Colors.white}
                />
              </TouchableOpacity>
              <View
                style={{
                  height: RfH(1),
                  backgroundColor: Colors.platiniumOne,
                  marginVertical: RfH(10),
                  marginHorizontal: RfW(24),
                }}
              />
            </>
          ) : null}
          {isAvatarVisible ? (
            <>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: RfW(24),
                  alignItems: "center",
                }}
                activeOpacity={0.4}
                onPress={() => {
                  chooseAvatar();
                }}
              >
                <CustomText
                  styling={styles.label}
                  color={isDarkMode ? Colors.white : Colors.white}
                >
                  {localize("common.chooseAvatar")}
                </CustomText>
                <CustomImage
                  image={isRTL() ? Images.arrowLeft : Images.arrowRight}
                  imageWidth={RfH(16)}
                  imageHeight={RfH(16)}
                  imageResizeMode={"contain"}
                  displayLoader={false}
                  styling={{
                    overflow: "hidden",
                    top: RfH(5),
                  }}
                  tintColor={isDarkMode ? Colors.white : Colors.white}
                />
              </TouchableOpacity>
              <View
                style={{
                  height: RfH(1),
                  backgroundColor: Colors.platiniumOne,
                  marginVertical: RfH(10),
                  marginHorizontal: RfW(24),
                }}
              />
            </>
          ) : null}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <>
      <CustomBottomSheet
        title={
          isVisibleAvatar
            ? localize("common.chooseAvatar")
            : title || localize("profile.profilePhotoTitle")
        }
        rightIconWidth={RfH(14)}
        rightIconHeight={RfH(14)}
        isVisible={isVisible && !openCameraDefault}
        innerViewContainer={isVisibleAvatar ? { height: "94%" } : {}}
        onRequestClose={() => {
          isVisibleAvatar ? setIsVisibleAvatar(false) : handleClose();
        }}
      >
        {isVisibleAvatar ? (
          <AvatarUpload onPressUploadAvatar={onPressUploadAvatar} />
        ) : (
          filePicker()
        )}
      </CustomBottomSheet>
    </>
  );
}

UploadDocument.propTypes = {
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func,
  isFilePickerVisible: PropTypes.bool,
  isPhotoPickerVisible: PropTypes.bool,
  handleUpload: PropTypes.func,
  snapCount: PropTypes.number,
  maxFileSize: PropTypes.number,
  fileNameWithTimeStamp: PropTypes.bool,
  isUploadFileOnServer: PropTypes.bool,
  title: PropTypes.string,
  isAvatarVisible: PropTypes.bool,
  cropping: PropTypes.bool,
  openCameraDefault: PropTypes.bool,
  imageCompressionQuality: PropTypes.number,
  isTenantServerUpload: PropTypes.bool,
  documentTypeId: documentTypeValidator,
};

UploadDocument.defaultProps = {
  isVisible: false,
  handleClose: null,
  isPhotoPickerVisible: true,
  isFilePickerVisible: false,
  handleUpload: null,
  snapCount: 1,
  maxFileSize: 5,
  fileNameWithTimeStamp: false,
  isUploadFileOnServer: false,
  isAvatarVisible: false,
  documentTypeId: undefined,
};

export default UploadDocument;
