import React, { SetStateAction } from "react";
import { View } from "react-native";
import { createStructuredSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles";
import { localize } from "../../locale/utils";
import { getUnitDicrepancy, getUnitList } from "./redux/actions";
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
  selectValues: any;
  setSelectValues: (data: any) => void;
  srId: number;
};

type option = {
  label: string;
  value: string | number;
};

function Step1({
  property,
  onContinue,
  selectValues,
  setSelectValues,
  srId,
}: Step1Props) {
  const dispatch = useDispatch();

  const { unitList } = useSelector(stateStructure);

  const getLevelOptions: () => option[] = () => {
    if (Array?.isArray(property?.levels))
      return property?.levels?.map((floor: string) => ({
        label: floor?.trim() || "Others",
        value: floor?.trim() || "others",
      }));
    return [];
  };

  const getUnitListOptions: () => option[] = () => {
    if (!selectValues?.level) {
      return [];
    }
    if (Array?.isArray(unitList?.list))
      return unitList?.list?.map((item) => ({
        label: `${item?.unit_code} - ${item?.unit_type} : ${item?.status}`,
        value: item?.unit_id,
        data: item,
      }));
    return [];
  };

  const handleFloorSelect = (item: option) => {
    setSelectValues((values) => ({
      ...values,
      level: item,
    }));

    dispatch(
      getUnitList.trigger({
        "property-id": property?.property_id,
        floor_code: item?.value,
        page: 1,
        limit: 10,
      })
    );
  };

  const handleUnitSelect = (item: option) => {
    setSelectValues((values) => ({
      ...values,
      unit: item,
    }));

    dispatch(
      getUnitDicrepancy.trigger({
        unit_id: item?.value,
        service_request_id: srId,
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
          isCard={false}
          value={selectValues?.level}
          onChange={handleFloorSelect}
          label={localize("form.level")}
          placeholder={localize("form.selectAValue")}
          data={getLevelOptions()}
        />
      </View>
      <View style={styles.formDropdown}>
        <CustomDropDown
          isCard={false}
          value={selectValues?.unit}
          onChange={handleUnitSelect}
          data={getUnitListOptions()}
          label={localize("form.unit")}
          placeholder={localize("form.selectAValue")}
        />
      </View>
      <CustomButton
        buttonText={localize("discrepancy.continue")}
        showSeperator={false}
        btnContainerStyle={styles.buttonStyle}
        handleOnSubmit={onContinue}
      />
    </View>
  );
}

export default Step1;
