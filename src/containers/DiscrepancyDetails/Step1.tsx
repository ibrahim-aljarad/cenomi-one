import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { createStructuredSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { isRTL, localize } from "../../locale/utils";
import { getUnitDicrepancy, getUnitList } from "./redux/actions";
import { getUnitListSelector } from "./redux/selectors";
import CustomDropDown from "../../components/CustomDropdown";
import {
  CustomButton,
  CustomImage,
  CustomText,
  CustomTextInput,
} from "../../components";
import { Colors, CommonStyles, Images } from "../../theme";
import { RfH, RfW } from "../../utils/helper";
import { isDarkModeSelector } from "../redux/selectors";
import { CameraScanner } from "../../components/CameraScanner";
import useQRScanner from "../../hooks/useQRScanner";
import { debounce } from "lodash";
import { alertBox } from "../../utils/helpers";

const stateStructure = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
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
  const { unitList, isDarkMode } = useSelector(stateStructure);

  const [allUnits, setAllUnits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasAttemptedNextPage, setHasAttemptedNextPage] = useState(false);
  const [hasNoUnits, setHasNoUnits] = useState(false);
  const itemsPerPage = 20;
  const [searchTerm, setSearchTerm] = useState("");
  const [isQRScan, setIsQRScan] = useState(false);

  const handleScan = (value: string) => {
    try {
      const { floor, unit } = JSON.parse(value);
     if (property?.marketing_name !== unit?.data?.properties?.marketing_name){
        alertBox(
          localize("common.error"),
          localize("discrepancy.invalidUnit"),
          {
            positiveText: localize("common.ok"),
            cancelable: true,
          }
        );
     } else {
        setSelectValues((values) => {
            const updatedValues = {
              ...values,
              level: floor,
              unit: unit,
            };
            return updatedValues;
          });
          setIsQRScan(true);
          dispatch(
            getUnitDicrepancy.trigger({
              unit_id: unit.value,
              service_request_id: srId,
            })
          );
     }
    } catch (error) {
        if (error instanceof SyntaxError) {
            alertBox(
              localize("common.error"),
              localize("discrepancy.invalidDataFormat"),
              {
                positiveText: localize("common.ok"),
                cancelable: true,
              }
            );
          } else {
            alertBox(
              localize("common.error"),
              localize("common.someThingWentWrong"),
              {
                positiveText: localize("common.ok"),
                cancelable: true,
              }
            );
          }
          console.error("Error parsing scanned data:", error);
    }
  };

  useEffect(() => {
    if (selectValues.level && selectValues.unit && isQRScan) {
      onContinue();
      setIsQRScan(false);
    }
  }, [selectValues, isQRScan]);

  const {
    isQRScannerVisible,
    scannedData,
    openQRScanner,
    handleReadCode,
    setIsQRScannerVisible,
  } = useQRScanner(handleScan);

  useEffect(() => {
    if (unitList?.list) {
      if (
        unitList.list.length === 0 &&
        unitList.pagination?.total_items > 0 &&
        currentPage === 1 &&
        !hasAttemptedNextPage
      ) {
        setHasAttemptedNextPage(true);
        fetchUnits(selectValues?.level?.value, 2);
        return;
      }
      if (unitList.list.length === 0 && currentPage === 1) {
        setHasNoUnits(true);
      } else {
        setHasNoUnits(false);
      }
      if (unitList.pagination.current_page === 1) {
        setAllUnits(unitList.list);
      } else {
        setAllUnits((prev) => [...prev, ...unitList.list]);
      }
      setCurrentPage(unitList.pagination.current_page);
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
    if (allUnits.length === 0) {
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

  const getUnitDropdownPlaceholder = () => {
    if (!selectValues?.level) {
      return localize("form.selectFloorFirst") || "Please select a floor first";
    }
    if (isLoading) {
      return localize("form.loadingUnits") || "Loading units...";
    }
    if (hasNoUnits) {
      return (
        localize("form.noUnitsOnFloor") || "No units available on this floor"
      );
    }
    return localize("form.selectAValue") || "Select a value";
  };

  const fetchUnits = useCallback(
    (floorCode: string | number, page: number, search?: string) => {
      setIsLoading(true);
      dispatch(
        getUnitList.trigger({
          "property-id": property?.property_id,
          floor_code: floorCode,
          page,
          limit: itemsPerPage,
          search: search || undefined,
        })
      );
    },
    [dispatch, property?.property_id]
  );

  const debouncedSearch = useCallback(
    debounce((searchValue: string, floorCode: string | number) => {
      if (searchValue.length >= 1) {
        setCurrentPage(1);
        setAllUnits([]);
        fetchUnits(floorCode, 1, searchValue);
      } else if (searchValue.length === 0) {
        setCurrentPage(1);
        setAllUnits([]);
        fetchUnits(floorCode, 1);
      }
    }, 300),
    []
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (selectValues?.level?.value) {
      debouncedSearch(value, selectValues.level.value);
    }
  };

  const handleFloorSelect = (item: option) => {
    setSelectValues((values) => ({
      ...values,
      level: item,
      unit: null,
    }));
    setAllUnits([]);
    setSearchTerm("");
    setHasAttemptedNextPage(false);
    setHasNoUnits(false);
    setCurrentPage(1);
    fetchUnits(item.value, 1);
  };

  const handleUnitSelect = (item: option) => {
    if (isLoading) {
      return;
    }
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
    const totalPages = Math.ceil(
      (unitList?.pagination?.total_items || 0) / itemsPerPage
    );

    if (currentPage < totalPages) {
      fetchUnits(
        selectValues?.level?.value,
        currentPage + 1,
        searchTerm || undefined
      );
    }
  };

  return (
    <View>
      <View style={styles.paddingContainer}>
        <TouchableOpacity
          style={[
            styles.uploadItemContainer,
            { borderColor: isDarkMode ? Colors.white : Colors.black },
          ]}
          onPress={openQRScanner}
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
              {localize("discrepancy.scanUnitQR")}
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
        {isQRScannerVisible && (
          <CameraScanner
            setIsCameraShown={setIsQRScannerVisible}
            onReadCode={handleReadCode}
          />
        )}
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
          placeholder={getUnitDropdownPlaceholder()}
          onEndReached={handleDropdownScroll}
          loading={isLoading}
          searchable={!!selectValues?.level && !hasNoUnits}
          searchPlaceholder={selectValues?.level ? "Search Unit..." : ""}
          onSearchChange={handleSearchChange}
          searchValue={selectValues?.level ? searchTerm : ""}
          disabled={isLoading || hasNoUnits || !selectValues?.level}
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
