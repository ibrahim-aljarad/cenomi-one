import React, { useEffect, useState } from "react";
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

  const [allUnits, setAllUnits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 20

  useEffect(() => {
    if (unitList?.list) {
      if (unitList.pagination.current_page === 1) {
        setAllUnits(unitList.list);
      } else {
        setAllUnits(prev => [...prev, ...unitList.list]);
      }
      setIsLoading(false);
    }
  }, [unitList]);

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
    if (Array?.isArray(allUnits))
      return allUnits?.map((item) => ({
        label: `${item?.unit_code} - ${item?.unit_type} : ${item?.status}`,
        value: item?.unit_id,
        data: item,
      }));
    return [];
  };

  const fetchUnits = (floorCode: string | number, page: number) => {
    setIsLoading(true);
    dispatch(
      getUnitList.trigger({
        "property-id": property?.property_id,
        floor_code: floorCode,
        page,
        limit: itemsPerPage,
      })
    );
  };


  const handleFloorSelect = (item: option) => {
    setSelectValues((values) => ({
      ...values,
      level: item,
      unit: null,
    }));
    setAllUnits([]);
    fetchUnits(item.value, 1);
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

  const handleDropdownScroll = () => {
    if (isLoading) return;

    const currentPage = unitList?.pagination?.current_page || 1;
    const totalPages = Math.ceil((unitList?.pagination?.total_items || 0) / itemsPerPage);

    if (currentPage < totalPages) {
      fetchUnits(selectValues?.level?.value, currentPage + 1);
    }
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
          onEndReached={handleDropdownScroll}
          loading={isLoading}
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
