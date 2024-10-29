import React from "react";
import { View } from "react-native";
import { createStructuredSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles";
import { localize } from "../../locale/utils";
import { getUnitList } from "./redux/actions";
import { getUnitListSelector } from "./redux/selectors";
import CustomDropDown from "../../components/CustomDropdown";
import { CustomButton, CustomTextInput } from "../../components";

const stateStructure = createStructuredSelector({
  unitList: getUnitListSelector,
});

type Step1Props = {
  onContinue: () => void;
  property: {
    property_id: number;
    marketing_name: string;
    marketing_name_arabic?: string;
    levels?: string[];
  };
};

type option = {
  label: string;
  value: string | number;
};

function Step1({ onContinue, property }: Step1Props) {
  const dispatch = useDispatch();

  const { unitList } = useSelector(stateStructure);

  const getLevelOptions: () => option[] = () => {
    if (Array?.isArray(property?.levels))
      return property?.levels?.map((floor: string) => ({
        label: floor,
        value: floor,
      }));
    return [];
  };


  const getUnitListOptions: () => option[] = () => {
    if (Array?.isArray(unitList?.list))
      return unitList?.list?.map(({unit_id, unit_code, unit_type}) => ({
        label: `${unit_code} - ${ unit_type}`,
        value: unit_id,
      }));
    return [];
  };
  
  const handleFloorSelect = ({ value }: option) => {
    dispatch(
      getUnitList.trigger({
        "property-id": property?.property_id,
        floor_code: value,
        page: 1,
        limit: 10,
      })
    );
  };

  return (
    <View>
      <View style={styles.paddingContainer}>
        <CustomTextInput
          label={"Mall"}
          value={property?.marketing_name}
          editable={false}
          showClearButton={false}
          isMandatory={false}
        />
      </View>
      <View style={styles.formDropdown}>
        <CustomDropDown
          data={[...getLevelOptions(), { label: "Others", value: "" }]}
          isCard={false}
          label={localize("form.level")}
          placeholder={localize("form.selectAValue")}
          onChange={handleFloorSelect}
        />
      </View>
      <View style={styles.formDropdown}>
        <CustomDropDown
          data={getUnitListOptions()}
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
