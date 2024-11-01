import React, { useEffect } from "react";
import { View } from "react-native";
import { CustomText } from "../../components";
import styles from "./styles";
import { Colors, CommonStyles } from "../../theme";
import { RfH, RfW } from "../../utils/helper";
import { createStructuredSelector } from "reselect";
import { getUnitDiscrepancySelector } from "./redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import Step3 from "./Step3";

const keyValuePairs = [
  { key: "status", label: "Unit Status" },
  { key: "lease_id", label: "Contract" },
  { key: "brand_name", label: "Brand" },
];

const stateStructure = createStructuredSelector({
  unitDiscrepancy: getUnitDiscrepancySelector,
});

function Step2({ setStep, selectValues, setSelectValues }) {
  const dispatch = useDispatch();

  const { unitDiscrepancy } = useSelector(stateStructure);

  useEffect(() => {
    if(unitDiscrepancy?.status === "DRAFT"){
      const {document_ids, payload} = unitDiscrepancy;
      console.log('payload?.status',payload?.status)
      setSelectValues((current) => ({
        ...current,
        storeClosed: payload?.store_closed,
        wrongLocation: payload?.wrong_location,
        brandChanged: payload?.brand_changed,
        openWithoutContract: payload?.open_without_contract,
        others: payload?.others,
        comment: payload?.comment||'',
        documentId: document_ids||[],
        reviewStatus: payload?.status,
      }))
    }else {
      setSelectValues((current) => ({
        ...current,
        storeClosed: false,
        wrongLocation: false,
        brandChanged: false,
        openWithoutContract: false,
        others: false,
        comment: "",
        documentId: [],
        reviewStatus: '',
      }))

    }
    
  }, [unitDiscrepancy]);
  const vals = [
    { value: selectValues?.level?.label, label: "Level" },
    { value: selectValues?.unit?.label, label: "Unit" },
  ];

  return (
    <>
      <View style={styles.paddingContainer}>
        {[...vals, ...keyValuePairs]?.map(
          ({
            key = "",
            label,
            value,
          }: {
            key?: string;
            value?: string;
            label: string;
          }) => (
            <View
              style={{
                marginTop: RfH(14),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={value || key}
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
              <CustomText
                fontSize={14}
                color={Colors.white}
                styling={{
                  marginStart: RfW(5),
                  lineHeight: RfH(20),
                  ...CommonStyles.regularFont400Style,
                }}
              >
                {value || selectValues?.unit?.data?.[key]}
              </CustomText>
            </View>
          )
        )}
      </View>
      <Step3
        selectValues={selectValues}
        setSelectValues={setSelectValues}
        setStep={setStep}
      />
    </>
  );
}

export default Step2;
