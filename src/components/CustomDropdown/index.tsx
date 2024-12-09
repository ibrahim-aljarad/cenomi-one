import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { Colors, CommonStyles, Images } from "../../theme";
import { BorderRadius } from "../../theme/sizes";
import { RfW } from "../../utils/helpers";
import CustomText from "../CustomText";
import { createStructuredSelector } from "reselect";
import { isDarkModeSelector } from "../../containers/redux/selectors";
import { useSelector } from "react-redux";
import CustomImage from "../CustomImage";
import { isRTL } from "../../locale/utils";
import { RfH, getColorWithOpacity } from "../../utils/helper";

const stateSructure = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
});

const CustomDropDown = (props: any) => {
  const {
    isMultiSelect = false,
    data,
    label,
    onChange,
    placeholder,
    isCard,
    isMandatory = true,
    customPlaceholderStyle = {},
    customSelectedTextStyle = {},
    rightIconComponent,
    searchable = false,
    searchPlaceholder = "Search",
    onSearchChange,
    searchValue,
    onEndReached,
    ...restData
  } = props;
  const { isDarkMode } = useSelector(stateSructure);

  const [value, setValue] = useState(null);
  const [selected, setSelected] = useState([]);

  const dropdownSection = (position) => {
    let flag = false;
    if (isRTL() && position === "left") {
      flag = true;
    } else if (isRTL() && position === "right") {
      flag = false;
    } else if (!isRTL() && position === "left") {
      flag = false;
    } else if (!isRTL() && position === "right") {
      flag = true;
    }

    if (flag === false) {
      return null;
    }

    if (rightIconComponent) {
      return rightIconComponent();
    }
    return (
      <CustomImage
        image={Images.chevronDown}
        imageWidth={10}
        imageHeight={10}
        imageResizeMode={"contain"}
      />
    );
  };

  const renderItem = (item, index) => {
    const findedItem = selected?.find((data) => data === item?.value);
    const isSelected = findedItem !== undefined;
    // const isSelected = true;

    return (
      <View
        style={[
          stylesDrop.item,
          {
            backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
          },
        ]}
      >
        <CustomText
          fontSize={12}
          color={isDarkMode ? Colors.white : Colors.app_black}
          styling={{
            marginLeft: RfW(16),
            ...CommonStyles.regularFont400Style,
          }}
        >
          {item.label}
        </CustomText>
        {item.value === value && (
          // <AntDesign
          //   style={stylesDrop.icon}
          //   color="black"
          //   name="Safety"
          //   size={20}
          // />
          <View></View>
        )}
        {isSelected ? (
          <View
            style={{
              marginRight: RfW(12),
              backgroundColor: "#F7F1FF",
              height: RfW(18),
              width: RfW(18),
              // borderRadius: RfW(10),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomImage
              image={Images.icCheckTick}
              imageHeight={RfH(10)}
              imageWidth={RfH(10)}
              tintColor={Colors.calendarPrimaryColor}
            />
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: RfW(24) }}>
      <CustomText
        fontSize={12}
        color={getColorWithOpacity(Colors.white, 0.6)}
        styling={{
          marginLeft: isCard ? RfW(16) : 0,
          ...CommonStyles.regularFont400Style,
        }}
      >
        {isMandatory ? "*" : ""}
        {label}
      </CustomText>
      {isMultiSelect ? (
        <MultiSelect
          style={isCard ? stylesDrop.dropdownCard : stylesDrop.dropdown}
          placeholderStyle={[
            stylesDrop.placeholderStyle,
            CommonStyles.regularFont400Style,
            { textAlign: "left", ...customPlaceholderStyle },
          ]}
          selectedTextStyle={[
            stylesDrop.selectedTextStyle,
            CommonStyles.regularFont400Style,
            {
              color: isDarkMode ? Colors.white : Colors.app_black,
              textAlign: "left",
              ...customSelectedTextStyle,
            },
          ]}
          inputSearchStyle={[
            stylesDrop.inputSearchStyle,
            { color: isDarkMode ? Colors.white : Colors.app_black },
          ]}
          // iconStyle={stylesDrop.iconStyle}
          data={data}
          search={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder ? placeholder : "Select item"}
          searchPlaceholder="Search..."
          value={selected}
          onChange={(item) => {
            // setValue(item.value);
            setSelected(item || []);
            onChange(item);
          }}
          renderLeftIcon={() => dropdownSection("left")}
          renderRightIcon={() => dropdownSection("right")}
          renderItem={renderItem}
          {...restData}
        />
      ) : (
        <Dropdown
          style={isCard ? stylesDrop.dropdownCard : stylesDrop.dropdown}
          placeholderStyle={[
            stylesDrop.placeholderStyle,
            CommonStyles.regularFont400Style,
            { textAlign: "left", ...customPlaceholderStyle },
          ]}
          selectedTextStyle={[
            stylesDrop.selectedTextStyle,
            CommonStyles.regularFont400Style,
            {
              color: isDarkMode ? Colors.white : Colors.white,
              textAlign: "left",
              ...customSelectedTextStyle,
            },
          ]}
          inputSearchStyle={stylesDrop.inputSearchStyle}
          // iconStyle={stylesDrop.iconStyle}
          data={data}
          search={searchable}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder ? placeholder : "Select item"}
          value={value}
          onChange={(item) => {
            setValue(item.value);
            onChange(item);
          }}
          renderInputSearch={() => (
            <TextInput
              placeholder={searchPlaceholder}
              placeholderTextColor={getColorWithOpacity(Colors.app_black, 0.8)}
              onChangeText={onSearchChange}
              value={searchValue}
              style={[
                stylesDrop.searchInput,
                {
                  backgroundColor: isDarkMode
                    ? Colors.darkModeButton
                    : Colors.white,
                  color: isDarkMode ? Colors.white : Colors.app_black,
                   textAlign: isRTL() ? 'right' : 'left',
                   writingDirection: isRTL() ? 'rtl' : 'ltr'
                },
              ]}
            />
          )}
          renderLeftIcon={() => dropdownSection("left")}
          renderRightIcon={() => dropdownSection("right")}
          renderItem={renderItem}
          {...restData}
          flatListProps={{
            onEndReached,
          }}
        />
      )}
    </View>
  );
};

export default CustomDropDown;
const stylesDrop = StyleSheet.create({
  dropdown: {
    height: 40,

    borderBottomWidth: 1,
    borderColor: Colors.grayLight,
    textAlign: isRTL() ? "right" : "left",
  },
  dropdownCard: {
    marginTop: 5,
    height: 64,
    backgroundColor: "white",
    borderRadius: BorderRadius.BR0,
    padding: 12,
    shadowColor: Colors.hexBlack,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: RfH(3)
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 14,
    color: getColorWithOpacity(Colors.white, 0.8),
  },
  selectedTextStyle: {
    fontSize: 14,
    color: Colors.app_black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    ...CommonStyles.regularFont400Style,
  },
  searchInput: {
    height: 40,
    borderWidth: 0,
    borderRadius: BorderRadius.BR0,
    padding: RfW(10),
    marginBottom: 5,
    fontSize: 14,
    ...CommonStyles.regularFont400Style,
  },
});
