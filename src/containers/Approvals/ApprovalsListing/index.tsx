import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Linking, SafeAreaView, View } from "react-native";
import { HeaderSVG, SearchComponent } from "../../../components";
import NavigationRouteNames from "../../../routes/ScreenNames";
import { Colors, Images } from "../../../theme";
import { RfH, getSaveData } from "../../../utils/helpers";
import ApprovalsListItems from "./ApprovalsListItems";
import styles from "./styles";

import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { isLoadingSelector } from "../../../appContainer/redux/selectors";
import EmptyListComponent from "../../../components/EmptyListComponent";
import ApprovalsListingSkeleton from "../../../components/SkeletonLoader/ApprovalsListingSkeleton";
import { localize } from "../../../locale/utils";
import { EVENT_NAME, trackEvent } from "../../../utils/analytics";
import { isDarkModeSelector } from "../../redux/selectors";
import {
  DoApprovalActionDone,
  getApprovalPendingTasks,
  getLeasingPendingTasks,
  getProcurementPendingTask,
  getWorkflowPendingTasks,
} from "../redux/actions";
import { getApprovalPendingTasksSelector } from "../redux/selectors";
import {
  isDealWorkflowModuleCheck,
  isProcurementServiceModuleCheck,
  isYardiServiceModuleCheck,
} from "../serializer";
import WrapperContainer from "../../../components/WrapperContainer";
import { RfW } from "../../../utils/helper";
import { LOCAL_STORAGE_DATA_KEY } from "../../../utils/constants";
import { ThemeProvider } from "../../../theme/context";

const stateSelector = createStructuredSelector({
  approvalPendingTasksData: getApprovalPendingTasksSelector,
  isLoading: isLoadingSelector,
  isDarkMode: isDarkModeSelector,
});

const ApprovalsListing = (props: any) => {
  const navigation = useNavigation();
  const {
    module,
    approvalType,
    redirectToExternalUrl = false,
  } = props.route.params;
  const [searchText, setSearchText] = useState("");
  const [isSearchViewVisible, setSearchViewVisible] = useState(true);
  const [filterPendingTasksList, setFilterPendingTasksList] = useState([]);
  const isFocused = useIsFocused();
  const [approvalPendingTasksList, setApprovalPendingTasksList] = useState([]);
  const dispatch = useDispatch();

  const { approvalPendingTasksData, isLoading, isDarkMode } =
    useSelector(stateSelector);

  useEffect(() => {
    trackEvent(EVENT_NAME.SCREEN_APPROVALS_LISTING);

    if (!approvalPendingTasksData || !searchText) {
      if (isYardiServiceModuleCheck(approvalType)) {
        dispatch(getLeasingPendingTasks.trigger());
      } else if (isProcurementServiceModuleCheck(approvalType)) {
        dispatch(getProcurementPendingTask.trigger());
      } else if (isDealWorkflowModuleCheck(approvalType)) {
        const fetchWithUserName = async () => {
          const userData = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_INFO);
          dispatch(
            getWorkflowPendingTasks.trigger({
              loggedInUser: JSON.parse(userData || "{}")?.username,
            })
          );
        };
        fetchWithUserName();
      } else {
        dispatch(getApprovalPendingTasks.trigger());
      }
    }

    dispatch(DoApprovalActionDone.trigger());
  }, [isFocused]);

  useEffect(() => {
    try {
      if (approvalPendingTasksData) {
        if (isDealWorkflowModuleCheck(approvalType)) {
          const listData = approvalPendingTasksData?.map((item) => ({
            createdBy: item?.createdBy,
            title: item?.formTitle,
            formName: item?.formName,
            date: item?.createdOn,
            featureModule: approvalType,
            externalId: module?.externalId,
            heading: `${item?.serialNumber} - ${item?.approvalRequestIdPk}`,
            number: item?.approvalRequestIdPk,
          }));
          setApprovalPendingTasksList(listData);
          setFilterPendingTasksList(listData);
        } else {
          const filterList = approvalPendingTasksData?.filter((item) => {
            return item?.subModule?.name === module?.name;
          });
          setFilterPendingTasksList(filterList);
          setApprovalPendingTasksList(filterList);
        }
      }
    } catch (error) {
      setApprovalPendingTasksList([]);
    }
  }, [approvalPendingTasksData]);

  useEffect(() => {
    if (isFocused && searchText) {
      SearchFilterFunction(searchText);
    }
  }, [isFocused, filterPendingTasksList]);

  const navigateToDetailScreen = (item) => {
    trackEvent(EVENT_NAME.PRESSED_APPROVALS_TASK_ITEM, { taskInfo: item });
    try {
      setSearchViewVisible(false);
      if (redirectToExternalUrl) {
        Linking.canOpenURL(item?.yardi_approval_url).then(
          (canOpen) => canOpen && Linking.openURL(item?.yardi_approval_url)
        );
      } else {
        navigation.navigate(NavigationRouteNames.APPROVALS_DETAILS, {
          approvalItem: {
            ...item,
            additionalInfo: {
              type: item?.Type,
              workflowName: item?.Workflow_Name,
              recordId: item?.RecordID,
              recordCode: item?.RecordCode,
            },
          },
          module,
          approvalType: approvalType,
          fromNotification: false,
          isButtonDisable: false,
        });
      }
    } catch (error) {
      // handleError(error);
    }
  };

  const SearchFilterFunction = (text) => {
    if (isYardiServiceModuleCheck(approvalType)) {
      const newData = filterPendingTasksList?.filter(function (item) {
        if (item?.Type.toLowerCase().includes(text.toLowerCase())) {
          return item;
        }
        if (item?.Workflow_Name.toLowerCase().includes(text.toLowerCase())) {
          return item;
        }
        if (item?.Property_Name.toLowerCase().includes(text.toLowerCase())) {
          return item;
        }
        if (
          item?.RecordID?.toString()?.toLowerCase().includes(text.toLowerCase())
        ) {
          return item;
        }
        if (
          item?.Brand?.toString()?.toLowerCase().includes(text.toLowerCase())
        ) {
          return item;
        }
        if (
          item?.Unit?.toString()?.toLowerCase().includes(text.toLowerCase())
        ) {
          return item;
        }
        if (
          item?.Requester_Name?.toString()
            ?.toLowerCase()
            .includes(text.toLowerCase())
        ) {
          return item;
        }
        //applying filter for the inserted text in search bar
      });
      setApprovalPendingTasksList(newData);
    } else {
      const newData = filterPendingTasksList?.filter(function (item) {
        //applying filter for the inserted text in search bar
        const itemData = item?.title
          ? item?.title.toUpperCase()
          : "".toUpperCase();
        const itemData1 = item?.number
          ? item?.number?.toString()?.toUpperCase()
          : "".toUpperCase();
        const itemHeading = item?.heading
          ? item?.heading.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return (
          itemHeading.indexOf(textData) > -1 ||
          itemData.indexOf(textData) > -1 ||
          itemData1?.indexOf(textData) > -1
        );
      });
      setApprovalPendingTasksList(newData);
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
    setApprovalPendingTasksList(filterPendingTasksList);
    setSearchViewVisible(false);
  };

  const listSection = () => {
    if (approvalPendingTasksData === undefined) {
      return <ApprovalsListingSkeleton isDarkMode={isDarkMode} />;
    }
    return approvalPendingTasksList?.length > 0 ? (
      <FlatList
        data={
          approvalPendingTasksList
          // isYardiServiceModuleCheck(approvalType)
          //   ? approvalPendingTasksList
          //   : approvalPendingTasksList?.sort(
          //       (a, b) => a?.priority - b?.priority,
          //     )
        }
        renderItem={({ item }) => (
          <ApprovalsListItems
            isDarkMode={isDarkMode}
            approvalItem={item}
            onPress={() => navigateToDetailScreen(item)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={null}
        ListFooterComponent={
          <View
            style={{
              height: RfH(50),
            }}
          />
        }
      />
    ) : (
      !isLoading && (
        <EmptyListComponent
          icon={Images.noApproval}
          errorText={localize("approvals.no_approval")}
        />
      )
    );
  };

  return (
    <WrapperContainer showOverlay>
      <SafeAreaView
        style={[
          styles.mainContainer,
          {
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.transparent,
          },
        ]}
      >
        <ThemeProvider useNewStyles={true}>
          <HeaderSVG
            isRightButtonVisible={false}
            isBackButtonVisible={true}
            titleText={module.name}
            titleFont={20}
            onRightButtonClickHandler={() => {}}
            onBackPressHandler={() => navigation.goBack()}
            isRight2BtnVisible={false}
            isBorderRadius={false}
          />
        </ThemeProvider>

        <View
          style={{
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.headerBgColor,
            paddingBottom: RfH(15),
            borderBottomLeftRadius: RfW(15),
            borderBottomRightRadius: RfW(15),
          }}
        >
          <SearchComponent
            placeholder={localize("common.search")}
            value={searchText}
            onChangeText={(search) => {
              setSearchText(search);
              SearchFilterFunction(search);
            }}
            cancelSearch={handleClearSearch}
            keyboardType={"default"}
          />
        </View>

        <View
          style={{
            flex: 1,
          }}
        >
          {listSection()}
        </View>
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default ApprovalsListing;
