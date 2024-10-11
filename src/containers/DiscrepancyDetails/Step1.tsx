import React from "react";
import { View } from "react-native";
import { CustomButton, CustomTextInput } from "../../components";
import styles from "./styles";
import CustomDropDown from "../../components/CustomDropdown";
import { localize } from "../../locale/utils";

function Step1({onContinue}) {
  return (
    <View>
      <View style={styles.paddingContainer}>
        <CustomTextInput label={"Mall"} />
      </View>
      <View style={styles.formDropdown}>
        <CustomDropDown
          data={[{ label: "df", value: "sdsd" }]}
          isCard={false}
          label={localize("form.level")}
          placeholder={localize("form.selectAValue")}
          onChange={(item) => {}}
        />
      </View>
      <View style={styles.formDropdown}>
        <CustomDropDown
          data={[{ label: "dfe", value: "sdsd" }]}
          isCard={false}
          label={localize("form.unit")}
          placeholder={localize("form.selectAValue")}
          onChange={(item) => {}}
        />
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

export default Step1;
