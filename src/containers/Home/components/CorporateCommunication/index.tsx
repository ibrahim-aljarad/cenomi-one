import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { memo, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import NavigationRouteNames from "../../../../routes/ScreenNames";
import { EVENT_NAME, trackEvent } from "../../../../utils/analytics";
import { RfH, RfW, getColorWithOpacity } from "../../../../utils/helper";
import {
  deviceWidth,
  getSaveData,
  getUserConfigData,
} from "../../../../utils/helpers";
import { getCorporateCommunication } from "../../redux/actions";
import {
  getCorporateCommunicationSelector,
  getFeatureModuleDataSelector,
} from "../../redux/selectors";
import { CorporateCommCard } from "./CorporateCommCard";
import { CorporateCommunicationSkeleton } from "../../../../components/SkeletonLoader";
import { getMyProfileDetailsSelector } from "../../../LoginHome/redux/selectors";
import {
  CONFIG_CONSTANT,
  LOCAL_STORAGE_DATA_KEY,
} from "../../../../utils/constants";
import { isDarkModeSelector } from "../../../redux/selectors";
import { Colors } from "../../../../theme";
import { isEmpty } from "lodash";
import Carousel, { Pagination } from "react-native-snap-carousel";

const stateSelector = createStructuredSelector({
  corporateCommunicationData: getCorporateCommunicationSelector,
  myProfileDetails: getMyProfileDetailsSelector,
  isDarkMode: isDarkModeSelector,
  featureModuleData: getFeatureModuleDataSelector,
});

const CorporateCommunication = (props: any) => {
  const {
    corporateCommunicationData,
    myProfileDetails,
    isDarkMode,
    featureModuleData,
  } = useSelector(stateSelector);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [readItems, setReadItems] = useState();
  const [corporateCommunicationList, setCorporateCommunicationList] = useState(
    []
  );
  const [activeSlide, setActiveSlide] = useState(0);

  const userConfigData = useMemo(() => {
    return getUserConfigData(
      myProfileDetails?.config?.config,
      CONFIG_CONSTANT?.CORPORATE_COMMUNICATION,
      featureModuleData
    );
  }, [
    myProfileDetails?.config?.config,
    CONFIG_CONSTANT?.CORPORATE_COMMUNICATION,
    featureModuleData,
  ]);

  useEffect(() => {
    if (isFocused) {
      dispatch(getCorporateCommunication.trigger());
      setActiveSlide(0);
    }
  }, [isFocused]);

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  useEffect(() => {
    if (!isEmpty(corporateCommunicationData)) {
      if (corporateCommunicationData?.length > 9) {
        const filteredData = corporateCommunicationData?.slice(0, 8) || [];
        filteredData.push({ isViewMoreEnable: true });

        const result = chunkArray(filteredData, 3);

        setCorporateCommunicationList(result || []);
      } else {
        const result = chunkArray(filteredData, 3);

        setCorporateCommunicationList(corporateCommunicationData || []);
      }
    }
  }, [corporateCommunicationData]);

  const handleOnClickItem = (item) => {
    // updateCorporateList(item.id);
    if (item?.isViewMoreEnable) {
      navigation.navigate(
        NavigationRouteNames.CORPORATECOMMUNICATIONLIST as never
      );
    } else {
      trackEvent(EVENT_NAME.PRESSED_CORPORATE_COMMUNICATION);
      navigation.navigate(
        NavigationRouteNames.CORPORATECOMMUNICATIONDETAILS as never,
        {
          id: item?.id,
        }
      );
    }
  };

  if (corporateCommunicationData === undefined) {
    return (
      <View style={{ paddingVertical: RfH(20) }}>
        <CorporateCommunicationSkeleton isDarkMode={isDarkMode} />
      </View>
    );
  } else {
    getSaveData(LOCAL_STORAGE_DATA_KEY.CORP_COMMU_READED_DATA).then((data) => {
      if (data) {
        let ids = JSON.parse(data)?.[myProfileDetails?.username];
        setReadItems(ids);
      }
    });
  }

  return (
    <View
      style={{
        paddingVertical: RfH(20),
        backgroundColor: isDarkMode
          ? Colors.darkModeBackground
          : Colors.transparent,
      }}
    >
      {userConfigData ? (
        <View>
          <Carousel
            data={corporateCommunicationList || []}
            renderItem={({ item: data, index }) => {
              return (
                <View style={{ flexDirection: "row", paddingLeft: RfW(16) }}>
                  {data?.map((item) => (
                    <CorporateCommCard
                      usedFor={"homePage"}
                      item={item}
                      readItems={readItems}
                      index={index}
                      handleClick={() => handleOnClickItem(item)}
                    />
                  ))}
                </View>
              );
            }}
            sliderWidth={deviceWidth()}
            itemWidth={deviceWidth()}
            onSnapToItem={(index) => {
              setActiveSlide(index);
            }}
          />

          <Pagination
            dotsLength={corporateCommunicationList?.length || 0}
            activeDotIndex={activeSlide}
            containerStyle={{
              backgroundColor: "rgba(31, 41, 55, 0.3)",
              borderRadius: RfW(26),
              marginTop: RfH(15),
              justifyContent: "center",
              alignSelf: "center",
              paddingVertical: 0,
              paddingHorizontal: RfW(5),
            }}
            dotStyle={{
              width: RfW(28),
              height: RfW(8),
              borderRadius: RfW(8),
              marginHorizontal: -RfH(5),
              backgroundColor: isDarkMode ? Colors.white : "#E8EEF2",
            }}
            inactiveDotStyle={{
              width: RfW(15),
              height: RfW(15),
              borderRadius: RfW(15),
              marginHorizontal: -RfH(10),
              backgroundColor: isDarkMode
                ? Colors.white
                : getColorWithOpacity(Colors.white, 0.5),
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default memo(CorporateCommunication);
