import React, { useEffect, useState } from "react";

import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  CustomButton,
  CustomImage,
  CustomText,
  CustomTextInput,
} from "../../components";
import { Colors, CommonStyles, Images } from "../../theme";
import { RfH, RfW, getImageUrl } from "../../utils/helper";
import styles from "./styles";
import { isRTL, localize } from "../../locale/utils";
import CustomRadioButton from "../../components/CustomRadioButton";
import CustomSwitch from "../../components/CustomSwitch";
import UploadDocument from "../../components/UploadDocument";
import {
  getTenantFileUploadedDataSelector,
  isDarkModeSelector,
} from "../redux/selectors";
import CustomModal from "../../components/CustomModal";
import AppPrimaryButton from "../../components/AppPrimaryButton";
import TenantImageViewer from "../../components/TenantImageViewer";
import { alertBox } from "../../utils/helpers";
import { getUnitDiscrepancySelector } from "./redux/selectors";
import { saveUnitDicrepancy } from "./redux/actions";

const yesOrNoPairs = [
  { key: "storeClosed", label: "Store Closed" },
  { key: "wrongLocation", label: "Wrong Location" },
  { key: "brandChanged", label: "Brand Changed" },
  { key: "openWithoutContract", label: "Open without Contract" },
  { key: "others", label: "Others" },
];
const stateStructure = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  tenantfileUploadedData: getTenantFileUploadedDataSelector,
  unitDiscrepancy: getUnitDiscrepancySelector,
});
function Step3({ selectValues, setSelectValues, setStep }) {
  const { isDarkMode, tenantfileUploadedData, unitDiscrepancy } =
    useSelector(stateStructure);
  const [isShowDocumentPickerModal, setIsShowDocumentPickerModal] =
    useState(false);
  const [fileUploadStarted, setFileUploadStarted] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState(null);
  const [imageList, setImageList] = useState<any>([]);

  const dispatch = useDispatch();

  const onPressUploadAttachment = () => {
    setFileUploadStarted(true);
    setIsShowDocumentPickerModal(true);
  };

  const { reviewStatus } = selectValues;

  const handleRemoveImage = (index) => {
    setImageList(imageList.filter((item, inx) => inx !== index));
    setImageModal(null);
  };

  const dataChange = (key, value) => {
    setSelectValues((current) => ({ ...current, [key]: value }));
  };

  useEffect(() => {
    if (fileUploadStarted && tenantfileUploadedData?.document_id) {
      setSelectValues(({ documentId, ...rest }) => ({
        ...rest,
        documentId: [...documentId, tenantfileUploadedData?.document_id],
      }));
    }
  }, [tenantfileUploadedData]);

  const handleSaveDiscrepancy = () => {
    if (!selectValues?.documentId?.length) {
      return alertBox(
        localize("discrepancy.takePhoto"),
        localize("discrepancy.takePhotoError")
      );
    }
    if (!reviewStatus) {
      return alertBox(
        localize("discrepancy.selectStatus"),
        localize("discrepancy.specifyStatus")
      );
    }

    const {
      comment,
      documentId,
      storeClosed,
      wrongLocation,
      brandChanged,
      openWithoutContract,
      others,
    } = selectValues;

    const isMismatch = (data) => {
      if (reviewStatus === "mismatch") return data;
      else return false;
    };

    const params = {
      payload: {
        others: isMismatch(others),
        status: reviewStatus,
        comment,
        store_closed: isMismatch(storeClosed),
        wrong_location: isMismatch(wrongLocation),
        open_without_contract: isMismatch(openWithoutContract),
        brand_changed: isMismatch(brandChanged),
      },
      document_ids: documentId,
      discrepancy_id: parseInt(unitDiscrepancy?.discrepancy_id),
      status: "DRAFT",
    };
    dispatch(saveUnitDicrepancy.trigger(params));
  };

  return (
    <View style={styles.paddingContainer}>
      {/* <View style={styles.borderSperator} /> */}
      <View
        style={{
          marginTop: RfH(14),
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CustomText
          fontSize={14}
          color={Colors.white}
          styling={{
            marginStart: RfW(5),
            lineHeight: RfH(20),
            ...CommonStyles.regularFont400Style,
          }}
        >
          Review Status:
        </CustomText>
        <CustomRadioButton
          icon={
            reviewStatus === "match"
              ? Images.radioButtonActive
              : Images.radioButtonInactive
          }
          labelText="Match"
          labelStyle={{ color: "white" }}
          labelSize={14}
          containerStyle={{ width: "50%", paddingLeft: RfH(10) }}
          onSelect={() => dataChange("reviewStatus", "match")}
        />
        <CustomRadioButton
          icon={
            reviewStatus === "mismatch"
              ? Images.radioButtonActive
              : Images.radioButtonInactive
          }
          labelText="Mismatch"
          labelStyle={{ color: "white" }}
          labelSize={14}
          containerStyle={{ width: "50%", paddingTop: RfH(0) }}
          onSelect={() => dataChange("reviewStatus", "mismatch")}
        />
      </View>
      <View>
        {reviewStatus === "mismatch" ? (
          yesOrNoPairs?.map(({ label, key }) => (
            <View
              style={{
                marginTop: RfH(14),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={key}
            >
              <CustomText
                fontSize={14}
                color={Colors.white}
                styling={{
                  marginStart: RfW(5),
                  lineHeight: RfH(20),
                  ...CommonStyles.boldFontStyle,
                }}
              >
                {label}:
              </CustomText>
              <CustomSwitch
                disabled={false}
                onValueChange={(val) => dataChange(key, val)}
                value={selectValues[key]}
              />
            </View>
          ))
        ) : (
          <View style={{ height: 100 }} />
        )}
        <CustomTextInput
          label={localize("form.comment")}
          isMandatory={selectValues?.others}
          onChangeHandler={(text) => dataChange("comment", text)}
          value={selectValues?.comment}
          noOfLines={3}
          multiline
          showClearButton={false}
          inputwrapperStyle={{
            borderWidth: 1,
            borderColor: "white",
            paddingHorizontal: 5,
          }}
        />
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {selectValues?.documentId?.map((id) => (
          <TenantImageViewer docId={id} />
        ))}
        {imageList.map((data, inx) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              margin: RfW(5),
              alignItems: "center",
            }}
            key={`img${inx}`}
            onPress={() => setImageModal(inx + 1)}
          >
            <CustomImage
              sourceObject={{ uri: data?.path }}
              imageHeight={RfH(70)}
              imageWidth={RfH(70)}
              imageResizeMode="contain"
              // tintColor={isDarkMode ? Colors.white : Colors.white}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View>
        {selectValues?.documentId?.map((id) => (
          <CustomText
            fontSize={14}
            color={Colors.black}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(17),
              marginLeft: RfW(12),
              marginTop: RfH(2),
            }}
            key={id}
          >
            {id}
          </CustomText>
        ))}
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.uploadItemContainer,
            { borderColor: isDarkMode ? Colors.white : Colors.black },
          ]}
          onPress={onPressUploadAttachment}
        >
          <View style={styles.directionRowCenter}>
            <CustomImage
              image={Images.uploadVoilet}
              imageWidth={22}
              imageHeight={24}
              imageResizeMode={"contain"}
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
                marginTop: RfH(2),
              }}
            >
              {localize("common.takeAPhoto")}
            </CustomText>
          </View>

          <CustomImage
            image={isRTL() ? Images.arrowLeft : Images.arrowRight}
            imageWidth={15}
            imageHeight={15}
            imageResizeMode={"contain"}
            displayLoader={false}
            containerStyling={{}}
            tintColor={isDarkMode ? Colors.white : Colors.black}
          />
        </TouchableOpacity>
        <UploadDocument
          title={localize("components.uploadPhoto")}
          isVisible={isShowDocumentPickerModal}
          handleClose={() => setIsShowDocumentPickerModal(false)}
          isUploadFileOnServer={false}
          cropping
          isTenantServerUpload={true}
          handleUpload={(data: any) => {
            const { filename, name } = data || {};
            setImageList([...imageList, data]);
            console.log(data);
          }}
          isFilePickerVisible={false}
          openCameraDefault
          imageCompressionQuality={0.6}
        />
      </View>
      <View>
        <CustomButton
          buttonText="Save"
          btnContainerStyle={styles.buttonStyle}
          handleOnSubmit={handleSaveDiscrepancy}
        />
      </View>
      {imageModal ? (
        <CustomModal
          modalVisible={!!imageModal}
          onRequestClose={() => setImageModal(null)}
        >
          <>
            <CustomImage
              sourceObject={{ uri: imageList[0] }}
              imageWidth={220}
              imageHeight={220}
              imageResizeMode={"contain"}
              displayLoader={false}
              containerStyling={{ paddingVertical: RfH(25) }}
            />
            <CustomText
              fontSize={20}
              styling={{
                ...CommonStyles.regularFont500Style,
                lineHeight: RfH(22),
                top: -RfH(10),
              }}
            >
              remove
            </CustomText>

            <View style={{ marginTop: RfH(22), width: "100%" }}>
              <AppPrimaryButton
                buttonText={localize("common.remove")}
                onPress={() => handleRemoveImage(imageModal - 1)}
              />
            </View>
          </>
        </CustomModal>
      ) : null}
    </View>
  );
}

export default Step3;
