import React from "react";
import { View } from "react-native";
import { CustomButton, CustomText} from "../../components";
import styles from "./styles";
import { localize } from "../../locale/utils";
import { Colors, CommonStyles } from "../../theme";
import { RfH, RfW } from "../../utils/helper";

const keyValuePairs = [
    { key: "unit_status", label: "Unit Status" },
    { key: "contract", label: "Contract" },
    { key: "brand", label: "Brand" },
  ];
function Step2({onContinue}) {
  return (
    <View>
      <View style={styles.paddingContainer}>
        {keyValuePairs?.map(({ key, label }) => (
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
            <CustomText
              fontSize={14}
              color={Colors.white}
              styling={{
                marginStart: RfW(5),
                lineHeight: RfH(20),
                ...CommonStyles.regularFont400Style,
              }}
            >
              {key}
            </CustomText>
          </View>
        ))}
      </View>
      <CustomButton
        buttonText="Continue"
        showSeperator={false}
        btnContainerStyle={styles.buttonStyle}
        handleOnSubmit={onContinue}
      />
    </View>
  );
}

export default Step2;
